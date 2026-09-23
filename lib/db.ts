import mysql from "mysql2/promise";

// ตรวจสอบ Environment Variables
const requiredEnv = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.warn(`⚠️ Missing environment variable: ${key}`);
  }
}

// สร้าง Connection Pool สำหรับ TiDB Cloud
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 4000),

  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  database: process.env.DB_NAME,

  // TiDB Cloud ใช้ TLS
  ssl: {
    minVersion: "TLSv1.2",
  },

  waitForConnections: true,

  // จำนวน connection สูงสุด
  connectionLimit: 10,

  // ถ้า connection เต็ม ให้รอ
  queueLimit: 0,

  // ตั้งเวลา connection
  connectTimeout: 10000,

  // ป้องกัน connection ค้างนานเกินไป
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// ตรวจสอบว่าเชื่อมต่อฐานข้อมูลได้หรือไม่ (ใช้โดย /api/health)
export async function checkDbConnection(): Promise<{
  ok: boolean;
  message: string;
}> {
  try {
    await pool.query("SELECT 1");
    return { ok: true, message: "Database connection successful" };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Database connection failed";
    console.error("DB HEALTH CHECK ERROR:", error);
    return { ok: false, message };
  }
}

export default pool;