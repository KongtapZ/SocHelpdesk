import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";

import pool from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth";

import type { RowDataPacket, ResultSetHeader } from "mysql2";

export const runtime = "nodejs";

/* =========================================================
   TYPES — ตรงกับคอลัมน์ใน db/schema.sql
========================================================= */

type RepairRow = RowDataPacket & {
  request_id: number;
  repair_no: string;

  user_id: number;
  prefix: string | null;
  fname: string | null;
  lname: string | null;
  email: string;

  category: string;
  equipment: string | null;
  location: string;
  subject: string;
  detail: string;
  priority: "low" | "normal" | "high";

  image_name: string | null;
  image_path: string | null;

  status: "pending" | "progress" | "done" | "cancel";
  technician_id: number | null;
  resolution_text: string | null;
  repair_cost: number | string | null;

  created_at: Date | string | null;
  accepted_at: Date | string | null;
  started_at: Date | string | null;
  completed_at: Date | string | null;
  closed_at: Date | string | null;
};

type RequestBody = {
  category?: unknown;
  equipment?: unknown;
  location?: unknown;

  title?: unknown;
  subject?: unknown;

  problemDescription?: unknown;
  problem_description?: unknown;
  detail?: unknown;

  priority?: unknown;
  status?: unknown;

  technicianId?: unknown;
  technician_id?: unknown;
  assignedTo?: unknown;
  assigned_to?: unknown;

  resolutionText?: unknown;
  resolution_text?: unknown;

  repairCost?: unknown;
  repair_cost?: unknown;
};

/* =========================================================
   HELPERS
========================================================= */

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    return String(
      (error as { message?: unknown }).message ?? error
    );
  }

  return String(error);
}

function toIdString(value: unknown): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  const result = String(value).trim();

  return result ? result : null;
}

function toNullableNumber(value: unknown): number | null {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  if (
    Number.isNaN(number) ||
    !Number.isFinite(number)
  ) {
    return null;
  }

  return number;
}

function normalizeStatus(
  value: unknown
): "pending" | "progress" | "done" | "cancel" {
  const status = String(value ?? "")
    .trim()
    .toLowerCase();

  if (
    status === "progress" ||
    status === "assigned" ||
    status === "in_progress" ||
    status === "in-progress" ||
    status === "in progress" ||
    status === "waiting" ||
    status === "working" ||
    status === "processing" ||
    status === "กำลังดำเนินการ" ||
    status === "กำลังซ่อม"
  ) {
    return "progress";
  }

  if (
    status === "done" ||
    status === "completed" ||
    status === "complete" ||
    status === "finished" ||
    status === "เสร็จแล้ว"
  ) {
    return "done";
  }

  if (
    status === "cancel" ||
    status === "cancelled" ||
    status === "canceled"
  ) {
    return "cancel";
  }

  return "pending";
}

function normalizePriority(
  value: unknown
): "low" | "normal" | "high" {
  const priority = String(value ?? "")
    .trim()
    .toLowerCase();

  if (
    priority === "urgent" ||
    priority === "high" ||
    priority === "เร่งด่วน" ||
    priority === "ด่วนมาก"
  ) {
    return "high";
  }

  if (
    priority === "low" ||
    priority === "ไม่เร่งด่วน"
  ) {
    return "low";
  }

  return "normal";
}

function toISOStringOrNull(
  value: Date | string | null
) {
  if (!value) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

/* =========================================================
   FORMAT ROW -> ให้ตรงกับทุกหน้าที่ใช้
========================================================= */

function formatRepair(item: RepairRow) {
  const requestId = String(item.request_id);

  return {
    id: item.request_id,
    requestId,
    request_id: requestId,

    repairNo: item.repair_no,
    repair_no: item.repair_no,
    requestCode: item.repair_no,

    userId: String(item.user_id),
    user_id: String(item.user_id),

    prefix: item.prefix ?? "",
    fname: item.fname ?? "",
    lname: item.lname ?? "",
    email: item.email,

    category: item.category,
    equipment: item.equipment ?? "",
    location: item.location,

    subject: item.subject,
    title: item.subject,

    detail: item.detail,
    description: item.detail,
    problemDescription: item.detail,

    priority: item.priority,
    status: item.status,

    technicianId:
      item.technician_id !== null
        ? String(item.technician_id)
        : null,

    technician_id:
      item.technician_id !== null
        ? String(item.technician_id)
        : null,

    assignedTo:
      item.technician_id !== null
        ? String(item.technician_id)
        : null,

    resolutionText: item.resolution_text,
    resolution_text: item.resolution_text,
    repairResult: item.resolution_text,

    repairCost:
      item.repair_cost !== null
        ? Number(item.repair_cost)
        : null,

    repair_cost:
      item.repair_cost !== null
        ? Number(item.repair_cost)
        : null,

    imageName: item.image_name,
    image_name: item.image_name,

    // ตอนนี้ imagePath จะเป็น URL ของ Vercel Blob
    imagePath: item.image_path,
    image_path: item.image_path,

    createdAt: toISOStringOrNull(item.created_at),
    acceptedAt: toISOStringOrNull(item.accepted_at),
    assignedAt: toISOStringOrNull(item.accepted_at),
    startedAt: toISOStringOrNull(item.started_at),
    completedAt: toISOStringOrNull(item.completed_at),
    closedAt: toISOStringOrNull(item.closed_at),

    cancelledAt:
      item.status === "cancel"
        ? toISOStringOrNull(item.closed_at)
        : null,
  };
}

const SELECT_COLUMNS = `
  request_id,
  repair_no,
  user_id,
  prefix,
  fname,
  lname,
  email,
  category,
  equipment,
  location,
  subject,
  detail,
  priority,
  image_name,
  image_path,
  status,
  technician_id,
  resolution_text,
  repair_cost,
  created_at,
  accepted_at,
  started_at,
  completed_at,
  closed_at
`;

/* =========================================================
   GET
   /api/repair?id=&email=&userId=&technicianId=
========================================================= */

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const id =
      url.searchParams.get("id")?.trim() ?? "";

    const email =
      url.searchParams.get("email")?.trim() ?? "";

    const queryUserId =
      url.searchParams.get("userId")?.trim() ?? "";

    const technicianId =
      url.searchParams.get("technicianId")?.trim() ?? "";

    let sql = `
      SELECT ${SELECT_COLUMNS}
      FROM repair_requests
    `;

    const params: unknown[] = [];

    if (id) {
      sql += " WHERE request_id = ?";
      params.push(id);
    } else if (email) {
      sql += " WHERE email = ?";
      params.push(email);
    } else if (technicianId) {
      sql += " WHERE technician_id = ?";
      params.push(technicianId);
    } else if (queryUserId) {
      sql += " WHERE user_id = ?";
      params.push(queryUserId);
    }

    sql += " ORDER BY created_at DESC";

    const [rows] =
      await pool.query<RepairRow[]>(
        sql,
        params
      );

    const repairs = rows.map(formatRepair);

    return NextResponse.json({
      success: true,
      data: repairs,
      repairs,
      count: repairs.length,
    });
  } catch (error) {
    const message = getErrorMessage(error);

    console.error(
      "REPAIR GET ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "ไม่สามารถดึงข้อมูลแจ้งซ่อมได้",
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST
   /api/repair
   multipart/form-data

   เปลี่ยนระบบ Upload:
   เดิม -> public/uploads/repair
   ใหม่ -> Vercel Blob
========================================================= */

export async function POST(req: Request) {
  /*
   * เก็บ URL ของ Blob ไว้สำหรับกรณี:
   * Upload สำเร็จ
   * แต่ INSERT Database ล้มเหลว
   *
   * จากนั้นจะพยายามลบ Blob ที่สร้างไว้
   */
  let uploadedBlobUrl: string | null = null;

  try {
    /* =====================================================
       ตรวจสอบ Session
    ===================================================== */

    const session =
      getSessionFromRequest(req);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message:
            "กรุณาเข้าสู่ระบบก่อนแจ้งซ่อม",
        },
        {
          status: 401,
        }
      );
    }

    const userId =
      toIdString(session.userId);

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่พบ user_id ใน Session",
        },
        {
          status: 401,
        }
      );
    }

    /* =====================================================
       รับ FormData
    ===================================================== */

    const formData =
      await req.formData();

    const prefix =
      String(
        formData.get("prefix") ?? ""
      ).trim();

    const fname =
      String(
        formData.get("fname") ?? ""
      ).trim();

    const lname =
      String(
        formData.get("lname") ?? ""
      ).trim();

    const email =
      String(
        formData.get("email") ??
          session.email ??
          ""
      ).trim();

    const category =
      String(
        formData.get("category") ?? ""
      ).trim();

    const equipment =
      String(
        formData.get("equipment") ?? ""
      ).trim();

    const location =
      String(
        formData.get("location") ?? ""
      ).trim();

    const subject =
      String(
        formData.get("subject") ??
          formData.get("title") ??
          ""
      ).trim();

    const detail =
      String(
        formData.get("detail") ??
          formData.get("problemDescription") ??
          formData.get("problem_description") ??
          ""
      ).trim();

    const priority =
      normalizePriority(
        formData.get("priority")
      );

    /* =====================================================
       ตรวจสอบผู้ใช้
    ===================================================== */

    const [userRows] =
      await pool.query<RowDataPacket[]>(
        `
        SELECT user_id
        FROM users
        WHERE user_id = ?
        LIMIT 1
        `,
        [userId]
      );

    if (userRows.length === 0) {
      console.error(
        "USER ID NOT FOUND:",
        userId
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่พบผู้ใช้งานนี้ในระบบ",
          userId,
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       ตรวจสอบข้อมูลจำเป็น
    ===================================================== */

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message:
            "กรุณาเลือกหมวดหมู่ครุภัณฑ์",
        },
        {
          status: 400,
        }
      );
    }

    if (!location) {
      return NextResponse.json(
        {
          success: false,
          message:
            "กรุณากรอกสถานที่แจ้งซ่อม",
        },
        {
          status: 400,
        }
      );
    }

    if (!subject) {
      return NextResponse.json(
        {
          success: false,
          message:
            "กรุณากรอกหัวข้อแจ้งซ่อม",
        },
        {
          status: 400,
        }
      );
    }

    if (!detail) {
      return NextResponse.json(
        {
          success: false,
          message:
            "กรุณากรอกรายละเอียดปัญหา",
        },
        {
          status: 400,
        }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่พบอีเมลผู้แจ้ง",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       เลขที่แจ้งซ่อม
    ===================================================== */

    const repairNo =
      `HD-${Date.now()}`;

    /* =====================================================
       รูปภาพแนบ
       Vercel Blob
    ===================================================== */

    let imageName: string | null = null;
    let imagePath: string | null = null;

    const image =
      formData.get("image");

    if (
      image instanceof File &&
      image.size > 0
    ) {
      /* ===================================================
         ประเภทไฟล์ที่อนุญาต
      =================================================== */

      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];

      if (
        !allowedTypes.includes(
          image.type
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "รองรับเฉพาะไฟล์ PNG, JPG, JPEG และ WEBP",
          },
          {
            status: 400,
          }
        );
      }

      /* ===================================================
         ขนาดไฟล์สูงสุด 5 MB
      =================================================== */

      if (
        image.size >
        5 * 1024 * 1024
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "ขนาดรูปภาพต้องไม่เกิน 5 MB",
          },
          {
            status: 400,
          }
        );
      }

      /* ===================================================
         สร้างชื่อไฟล์
      =================================================== */

      const extension =
        image.name
          .split(".")
          .pop()
          ?.toLowerCase() ||
        "jpg";

      imageName =
        `${repairNo}-${Date.now()}.${extension}`;

      /* ===================================================
         Upload ไป Vercel Blob

         ตัวอย่าง Path:

         repair/HD-1234567890-1234567891.png
      =================================================== */

      const blob =
        await put(
          `repair/${imageName}`,
          image,
          {
            access: "public",
            contentType: image.type,
          }
        );

      /* ===================================================
         เก็บ URL ของ Blob
      =================================================== */

      uploadedBlobUrl =
        blob.url;

      imagePath =
        blob.url;

      console.log(
        "✅ REPAIR IMAGE UPLOAD SUCCESS:",
        {
          imageName,
          imagePath,
        }
      );
    }

    /* =====================================================
       บันทึกข้อมูลลง Database
    ===================================================== */

    const [result] =
      await pool.query<ResultSetHeader>(
        `
        INSERT INTO repair_requests (
          repair_no,
          user_id,
          prefix,
          fname,
          lname,
          email,
          category,
          equipment,
          location,
          subject,
          detail,
          priority,
          image_name,
          image_path,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          repairNo,
          userId,
          prefix || null,
          fname || null,
          lname || null,
          email,
          category,
          equipment || null,
          location,
          subject,
          detail,
          priority,
          imageName,
          imagePath,
          "pending",
        ]
      );

    const requestId =
      String(
        result.insertId ?? ""
      );

    console.log(
      "✅ REPAIR INSERT SUCCESS",
      {
        requestId,
        repairNo,
        userId,
      }
    );

    /* =====================================================
       Response
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "แจ้งซ่อมเรียบร้อยแล้ว",

        requestId,

        repairNo,

        requestCode:
          repairNo,

        imageName,

        imagePath,

        data: {
          requestId,
          repairNo,
          imageName,
          imagePath,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    /* =====================================================
       ถ้า Upload Blob สำเร็จ
       แต่ Database INSERT ล้มเหลว
       ให้พยายามลบ Blob ที่สร้างไว้
    ===================================================== */

    if (uploadedBlobUrl) {
      try {
        await del(
          uploadedBlobUrl
        );

        console.log(
          "BLOB CLEANUP SUCCESS:",
          uploadedBlobUrl
        );
      } catch (cleanupError) {
        console.error(
          "BLOB CLEANUP ERROR:",
          cleanupError
        );
      }
    }

    const message =
      getErrorMessage(error);

    console.error(
      "REPAIR POST ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "ไม่สามารถบันทึกข้อมูลแจ้งซ่อมได้",
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   ตรวจสอบและอัปเดตช่างเทคนิค
   ใช้ร่วมกันใน PUT/PATCH
========================================================= */

async function resolveTechnicianId(
  technicianValue: unknown
):
  Promise<
    | {
        ok: true;
        technicianId: string | null;
      }
    | {
        ok: false;
        message: string;
      }
  > {
  if (
    technicianValue === undefined ||
    technicianValue === null ||
    technicianValue === ""
  ) {
    return {
      ok: true,
      technicianId: null,
    };
  }

  const technicianId =
    toIdString(
      technicianValue
    );

  if (!technicianId) {
    return {
      ok: false,
      message:
        "ไม่พบรหัสช่าง",
    };
  }

  const [technicianRows] =
    await pool.query<RowDataPacket[]>(
      `
      SELECT user_id
      FROM users
      WHERE user_id = ?
        AND role = 'technician'
      LIMIT 1
      `,
      [technicianId]
    );

  if (
    technicianRows.length === 0
  ) {
    return {
      ok: false,
      message:
        "ไม่พบช่างที่ระบุ",
    };
  }

  return {
    ok: true,
    technicianId,
  };
}

/* =========================================================
   PUT
   /api/repair?id=

   แก้ไขรายละเอียด / เปลี่ยนสถานะ
========================================================= */

export async function PUT(
  req: Request
) {
  try {
    const session =
      getSessionFromRequest(req);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message:
            "กรุณาเข้าสู่ระบบก่อนใช้งาน",
        },
        {
          status: 401,
        }
      );
    }

    const url =
      new URL(req.url);

    const requestId =
      url.searchParams
        .get("id")
        ?.trim() ?? "";

    if (!requestId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่พบรหัสรายการแจ้งซ่อม",
        },
        {
          status: 400,
        }
      );
    }

    const body =
      (await req.json()) as RequestBody;

    const [existingRows] =
      await pool.query<RepairRow[]>(
        `
        SELECT ${SELECT_COLUMNS}
        FROM repair_requests
        WHERE request_id = ?
        LIMIT 1
        `,
        [requestId]
      );

    if (
      existingRows.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่พบรายการแจ้งซ่อม",
        },
        {
          status: 404,
        }
      );
    }

    const existing =
      existingRows[0];

    const fields: string[] = [];
    const values: unknown[] = [];

    /* =====================================================
       Subject
    ===================================================== */

    const subject =
      body.title ??
      body.subject;

    if (
      subject !== undefined
    ) {
      fields.push(
        "subject = ?"
      );

      values.push(
        String(subject).trim()
      );
    }

    /* =====================================================
       Detail
    ===================================================== */

    const detail =
      body.problemDescription ??
      body.problem_description ??
      body.detail;

    if (
      detail !== undefined
    ) {
      fields.push(
        "detail = ?"
      );

      values.push(
        String(detail).trim()
      );
    }

    /* =====================================================
       Category
    ===================================================== */

    if (
      body.category !== undefined
    ) {
      fields.push(
        "category = ?"
      );

      values.push(
        String(
          body.category
        ).trim()
      );
    }

    /* =====================================================
       Equipment
    ===================================================== */

    if (
      body.equipment !== undefined
    ) {
      fields.push(
        "equipment = ?"
      );

      values.push(
        String(
          body.equipment
        ).trim() || null
      );
    }

    /* =====================================================
       Location
    ===================================================== */

    if (
      body.location !== undefined
    ) {
      fields.push(
        "location = ?"
      );

      values.push(
        String(
          body.location
        ).trim()
      );
    }

    /* =====================================================
       Priority
    ===================================================== */

    if (
      body.priority !== undefined
    ) {
      fields.push(
        "priority = ?"
      );

      values.push(
        normalizePriority(
          body.priority
        )
      );
    }

    /* =====================================================
       Resolution
    ===================================================== */

    if (
      body.resolutionText !== undefined ||
      body.resolution_text !== undefined
    ) {
      fields.push(
        "resolution_text = ?"
      );

      values.push(
        String(
          body.resolutionText ??
            body.resolution_text ??
            ""
        ).trim() || null
      );
    }

    /* =====================================================
       Repair Cost
    ===================================================== */

    if (
      body.repairCost !== undefined ||
      body.repair_cost !== undefined
    ) {
      fields.push(
        "repair_cost = ?"
      );

      values.push(
        toNullableNumber(
          body.repairCost ??
            body.repair_cost
        )
      );
    }

    /* =====================================================
       Technician
    ===================================================== */

    const technicianValue =
      body.technicianId ??
      body.technician_id ??
      body.assignedTo ??
      body.assigned_to;

    if (
      technicianValue !== undefined &&
      technicianValue !== null &&
      technicianValue !== ""
    ) {
      const resolved =
        await resolveTechnicianId(
          technicianValue
        );

      if (!resolved.ok) {
        return NextResponse.json(
          {
            success: false,
            message:
              resolved.message,
          },
          {
            status: 400,
          }
        );
      }

      fields.push(
        "technician_id = ?"
      );

      values.push(
        resolved.technicianId
      );

      fields.push(
        "accepted_at = COALESCE(accepted_at, NOW())"
      );
    } else if (
      existing.technician_id === null &&
      session.role === "technician" &&
      body.status !== undefined
    ) {
      fields.push(
        "technician_id = ?"
      );

      values.push(
        session.userId
      );

      fields.push(
        "accepted_at = COALESCE(accepted_at, NOW())"
      );
    }

    /* =====================================================
       Status
    ===================================================== */

    if (
      body.status !== undefined
    ) {
      const status =
        normalizeStatus(
          body.status
        );

      fields.push(
        "status = ?"
      );

      values.push(status);

      if (
        status === "progress"
      ) {
        fields.push(
          "accepted_at = COALESCE(accepted_at, NOW())"
        );

        fields.push(
          "started_at = COALESCE(started_at, NOW())"
        );
      }

      if (
        status === "done"
      ) {
        fields.push(
          "completed_at = COALESCE(completed_at, NOW())"
        );
      }

      if (
        status === "cancel"
      ) {
        fields.push(
          "closed_at = COALESCE(closed_at, NOW())"
        );
      }
    }

    /* =====================================================
       ไม่มีข้อมูลแก้ไข
    ===================================================== */

    if (
      fields.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่มีข้อมูลสำหรับแก้ไข",
        },
        {
          status: 400,
        }
      );
    }

    values.push(
      requestId
    );

    await pool.query(
      `
      UPDATE repair_requests
      SET ${fields.join(", ")}
      WHERE request_id = ?
      `,
      values
    );

    return NextResponse.json({
      success: true,
      message:
        "อัปเดตรายการแจ้งซ่อมสำเร็จ",
      requestId,
    });
  } catch (error) {
    const message =
      getErrorMessage(error);

    console.error(
      "REPAIR PUT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "ไม่สามารถอัปเดตรายการแจ้งซ่อมได้",
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   PATCH
   /api/repair?id=

   เปลี่ยนสถานะแบบเร็ว
========================================================= */

export async function PATCH(
  req: Request
) {
  try {
    const session =
      getSessionFromRequest(req);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message:
            "กรุณาเข้าสู่ระบบก่อนใช้งาน",
        },
        {
          status: 401,
        }
      );
    }

    const url =
      new URL(req.url);

    const requestId =
      (
        url.searchParams.get(
          "requestId"
        ) ??
        url.searchParams.get(
          "id"
        ) ??
        ""
      ).trim();

    if (!requestId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่พบ request_id ของรายการ",
        },
        {
          status: 400,
        }
      );
    }

    let body: RequestBody = {};

    try {
      body =
        (await req.json()) as RequestBody;
    } catch {
      body = {};
    }

    const [existingRows] =
      await pool.query<RepairRow[]>(
        `
        SELECT ${SELECT_COLUMNS}
        FROM repair_requests
        WHERE request_id = ?
        LIMIT 1
        `,
        [requestId]
      );

    if (
      existingRows.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่พบรายการแจ้งซ่อม",
        },
        {
          status: 404,
        }
      );
    }

    const existing =
      existingRows[0];

    const status =
      normalizeStatus(
        body.status ??
          "progress"
      );

    const fields: string[] = [
      "status = ?",
    ];

    const values: unknown[] = [
      status,
    ];

    /* =====================================================
       Technician
    ===================================================== */

    const technicianValue =
      body.technicianId ??
      body.technician_id ??
      body.assignedTo ??
      body.assigned_to;

    if (
      technicianValue !== undefined &&
      technicianValue !== null &&
      technicianValue !== ""
    ) {
      const resolved =
        await resolveTechnicianId(
          technicianValue
        );

      if (!resolved.ok) {
        return NextResponse.json(
          {
            success: false,
            message:
              resolved.message,
          },
          {
            status: 400,
          }
        );
      }

      fields.push(
        "technician_id = ?"
      );

      values.push(
        resolved.technicianId
      );

      fields.push(
        "accepted_at = COALESCE(accepted_at, NOW())"
      );
    } else if (
      existing.technician_id === null &&
      session.role === "technician"
    ) {
      fields.push(
        "technician_id = ?"
      );

      values.push(
        session.userId
      );

      fields.push(
        "accepted_at = COALESCE(accepted_at, NOW())"
      );
    }

    /* =====================================================
       Resolution
    ===================================================== */

    if (
      body.resolutionText !== undefined ||
      body.resolution_text !== undefined
    ) {
      fields.push(
        "resolution_text = ?"
      );

      values.push(
        String(
          body.resolutionText ??
            body.resolution_text ??
            ""
        ).trim() || null
      );
    }

    /* =====================================================
       Repair Cost
    ===================================================== */

    if (
      body.repairCost !== undefined ||
      body.repair_cost !== undefined
    ) {
      fields.push(
        "repair_cost = ?"
      );

      values.push(
        toNullableNumber(
          body.repairCost ??
            body.repair_cost
        )
      );
    }

    /* =====================================================
       Status timestamps
    ===================================================== */

    if (
      status === "progress"
    ) {
      fields.push(
        "started_at = COALESCE(started_at, NOW())"
      );
    }

    if (
      status === "done"
    ) {
      fields.push(
        "completed_at = COALESCE(completed_at, NOW())"
      );
    }

    if (
      status === "cancel"
    ) {
      fields.push(
        "closed_at = COALESCE(closed_at, NOW())"
      );
    }

    values.push(
      requestId
    );

    const [result] =
      await pool.query<ResultSetHeader>(
        `
        UPDATE repair_requests
        SET ${fields.join(", ")}
        WHERE request_id = ?
        `,
        values
      );

    if (
      Number(
        result.affectedRows
      ) === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่สามารถอัปเดตรายการได้",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,

      message:
        status === "progress"
          ? "รับงานเรียบร้อยแล้ว"
          : "เปลี่ยนสถานะสำเร็จ",

      requestId,

      status,
    });
  } catch (error) {
    const message =
      getErrorMessage(error);

    console.error(
      "REPAIR PATCH ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "ไม่สามารถเปลี่ยนสถานะได้",
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE
   /api/repair?id=
========================================================= */

export async function DELETE(
  req: Request
) {
  try {
    const session =
      getSessionFromRequest(req);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message:
            "กรุณาเข้าสู่ระบบก่อนใช้งาน",
        },
        {
          status: 401,
        }
      );
    }

    const url =
      new URL(req.url);

    const requestId =
      url.searchParams
        .get("id")
        ?.trim() ?? "";

    if (!requestId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่พบรหัสรายการแจ้งซ่อม",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       ดึงข้อมูลรายการก่อนลบ
       รวม image_path เพื่อใช้ลบ Blob
    ===================================================== */

    const [rows] =
      await pool.query<RepairRow[]>(
        `
        SELECT
          request_id,
          repair_no,
          image_path
        FROM repair_requests
        WHERE request_id = ?
        LIMIT 1
        `,
        [requestId]
      );

    const repair =
      rows[0];

    if (!repair) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่พบรายการแจ้งซ่อม",
        },
        {
          status: 404,
        }
      );
    }

    /* =====================================================
       ลบข้อมูลจาก Database
    ===================================================== */

    const [result] =
      await pool.query<ResultSetHeader>(
        `
        DELETE FROM repair_requests
        WHERE request_id = ?
        `,
        [requestId]
      );

    if (
      Number(
        result.affectedRows
      ) !== 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "ไม่สามารถลบรายการแจ้งซ่อมได้",
        },
        {
          status: 500,
        }
      );
    }

    /* =====================================================
       ลบรูปจาก Vercel Blob

       ถ้ามี image_path
    ===================================================== */

    if (repair.image_path) {
      try {
        await del(
          repair.image_path
        );

        console.log(
          "✅ REPAIR IMAGE DELETE SUCCESS:",
          repair.image_path
        );
      } catch (blobError) {
        /*
         * ไม่ให้การลบรูปที่ล้มเหลว
         * ทำให้การลบ Ticket ล้มเหลว
         */
        console.error(
          "REPAIR BLOB DELETE ERROR:",
          blobError
        );
      }
    }

    return NextResponse.json({
      success: true,

      message:
        "ลบรายการแจ้งซ่อมเรียบร้อยแล้ว",

      requestId,

      repairNo:
        repair.repair_no,

      requestCode:
        repair.repair_no,
    });
  } catch (error) {
    const message =
      getErrorMessage(error);

    console.error(
      "REPAIR DELETE ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "ไม่สามารถลบรายการแจ้งซ่อมได้",
        error: message,
      },
      {
        status: 500,
      }
    );
  }
}