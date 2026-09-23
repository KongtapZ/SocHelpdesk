(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/technician/new-jobs/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TechnicianPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-jsx/style.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function toNumber(value) {
    if (value === null || value === undefined || value === "") {
        return null;
    }
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
}
function toText(value, fallback = "") {
    if (value === null || value === undefined) {
        return fallback;
    }
    const text = String(value).trim();
    return text || fallback;
}
function normalizeStatus(value) {
    const status = toText(value).toLowerCase();
    if (status === "progress" || status === "in_progress" || status === "in-progress" || status === "accepted" || status === "assigned" || status === "working" || status === "กำลังดำเนินการ") {
        return "progress";
    }
    if (status === "done" || status === "completed" || status === "closed" || status === "finish" || status === "finished" || status === "เสร็จแล้ว") {
        return "done";
    }
    return "pending";
}
function normalizePriority(value) {
    const priority = toText(value).toLowerCase();
    if (priority === "high" || priority === "urgent" || priority === "critical" || priority === "เร่งด่วน") {
        return "high";
    }
    if (priority === "low" || priority === "ไม่เร่งด่วน") {
        return "low";
    }
    return "normal";
}
function formatDate(value) {
    if (!value) {
        return "-";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "-";
    }
    return new Intl.DateTimeFormat("th-TH", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(date);
}
function formatShortDate(value) {
    if (!value) {
        return "-";
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return "-";
    }
    return new Intl.DateTimeFormat("th-TH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(date);
}
function getReporterName(item) {
    const directName = toText(item.reporterName);
    if (directName) {
        return directName;
    }
    const name = [
        toText(item.prefix),
        toText(item.fname),
        toText(item.lname)
    ].filter(Boolean).join(" ").trim();
    return name || "-";
}
function getImagePath(item) {
    const raw = toText(item.imagePath ?? item.image_path ?? item.imageName ?? item.image_name);
    if (!raw) {
        return null;
    }
    if (raw.startsWith("http://") || raw.startsWith("https://") || raw.startsWith("data:")) {
        return raw;
    }
    if (raw.startsWith("/")) {
        return raw;
    }
    return `/${raw}`;
}
function mapRepairToJob(item) {
    const requestId = toNumber(item.requestId ?? item.request_id);
    if (requestId === null) {
        return null;
    }
    const repairNo = toText(item.repairNo ?? item.repair_no) || `HD-${requestId}`;
    return {
        requestId,
        repairNo,
        title: toText(item.title ?? item.subject) || "แจ้งซ่อมระบบ",
        category: toText(item.category) || "ทั่วไป",
        equipment: toText(item.equipment) || "-",
        location: toText(item.location) || "-",
        priority: normalizePriority(item.priority),
        status: normalizeStatus(item.status),
        reporterName: getReporterName(item),
        email: toText(item.email) || "-",
        description: toText(item.description ?? item.detail) || "-",
        imagePath: getImagePath(item),
        technicianId: toNumber(item.technicianId ?? item.technician_id),
        repairCost: toNumber(item.repairCost ?? item.repair_cost),
        createdAt: toText(item.createdAt ?? item.created_at) || null,
        acceptedAt: toText(item.acceptedAt ?? item.accepted_at) || null,
        startedAt: toText(item.startedAt ?? item.started_at) || null,
        completedAt: toText(item.completedAt ?? item.completed_at) || null,
        closedAt: toText(item.closedAt ?? item.closed_at) || null
    };
}
async function readApiResponse(response) {
    const rawText = await response.text();
    if (!rawText) {
        return {
            success: response.ok,
            message: response.ok ? "" : `HTTP ${response.status} ${response.statusText}`
        };
    }
    try {
        return JSON.parse(rawText);
    } catch  {
        return {
            success: false,
            message: rawText.slice(0, 500),
            error: `API ส่งข้อมูลที่ไม่ใช่ JSON (HTTP ${response.status})`
        };
    }
}
const navItems = [
    {
        label: "ภาพรวม",
        path: "/technician",
        icon: "▦"
    },
    {
        label: "งานใหม่",
        path: "/new-jobs",
        icon: "✉"
    },
    {
        label: "กำลังดำเนินการ",
        path: "/progress-jobs",
        icon: "↻"
    },
    {
        label: "งานเสร็จแล้ว",
        path: "/completed-jobs",
        icon: "✓"
    },
    {
        label: "งานทั้งหมด",
        path: "/all-jobs",
        icon: "☷"
    },
    {
        label: "ตั้งค่า",
        path: "/settings",
        icon: "⚙"
    }
];
function TechnicianPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [jobs, setJobs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [refreshing, setRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [selectedJob, setSelectedJob] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [processingId, setProcessingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const loadRepairs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "TechnicianPage.useCallback[loadRepairs]": async (showRefresh = false)=>{
            try {
                if (showRefresh) {
                    setRefreshing(true);
                } else {
                    setLoading(true);
                }
                setError("");
                const response = await fetch("/api/repair", {
                    method: "GET",
                    cache: "no-store",
                    headers: {
                        Accept: "application/json"
                    }
                });
                const data = await readApiResponse(response);
                if (!response.ok || data.success !== true) {
                    throw new Error(data.error || data.message || `HTTP ${response.status} ${response.statusText}`);
                }
                const source = Array.isArray(data.repairs) ? data.repairs : Array.isArray(data.data) ? data.data : [];
                const mappedJobs = source.map({
                    "TechnicianPage.useCallback[loadRepairs].mappedJobs": (item)=>mapRepairToJob(item)
                }["TechnicianPage.useCallback[loadRepairs].mappedJobs"]).filter({
                    "TechnicianPage.useCallback[loadRepairs].mappedJobs": (item)=>item !== null
                }["TechnicianPage.useCallback[loadRepairs].mappedJobs"]);
                setJobs(mappedJobs);
            } catch (errorValue) {
                console.error("❌ Technician loadRepairs error:", errorValue);
                const message = errorValue instanceof Error ? errorValue.message : "ไม่สามารถดึงข้อมูลแจ้งซ่อมได้";
                setError(message);
            } finally{
                setLoading(false);
                setRefreshing(false);
            }
        }
    }["TechnicianPage.useCallback[loadRepairs]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TechnicianPage.useEffect": ()=>{
            void loadRepairs();
        }
    }["TechnicianPage.useEffect"], [
        loadRepairs
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TechnicianPage.useEffect": ()=>{
            if (!successMessage) {
                return;
            }
            const timer = window.setTimeout({
                "TechnicianPage.useEffect.timer": ()=>{
                    setSuccessMessage("");
                }
            }["TechnicianPage.useEffect.timer"], 3500);
            return ({
                "TechnicianPage.useEffect": ()=>{
                    window.clearTimeout(timer);
                }
            })["TechnicianPage.useEffect"];
        }
    }["TechnicianPage.useEffect"], [
        successMessage
    ]);
    const statistics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TechnicianPage.useMemo[statistics]": ()=>{
            const total = jobs.length;
            const pending = jobs.filter({
                "TechnicianPage.useMemo[statistics]": (job)=>job.status === "pending"
            }["TechnicianPage.useMemo[statistics]"]).length;
            const progress = jobs.filter({
                "TechnicianPage.useMemo[statistics]": (job)=>job.status === "progress"
            }["TechnicianPage.useMemo[statistics]"]).length;
            const done = jobs.filter({
                "TechnicianPage.useMemo[statistics]": (job)=>job.status === "done"
            }["TechnicianPage.useMemo[statistics]"]).length;
            const urgent = jobs.filter({
                "TechnicianPage.useMemo[statistics]": (job)=>job.priority === "high"
            }["TechnicianPage.useMemo[statistics]"]).length;
            return {
                total,
                pending,
                progress,
                done,
                urgent
            };
        }
    }["TechnicianPage.useMemo[statistics]"], [
        jobs
    ]);
    const filteredJobs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TechnicianPage.useMemo[filteredJobs]": ()=>{
            const keyword = search.trim().toLowerCase();
            return jobs.filter({
                "TechnicianPage.useMemo[filteredJobs]": (job)=>{
                    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
                    if (!matchesStatus) {
                        return false;
                    }
                    if (!keyword) {
                        return true;
                    }
                    const searchableText = [
                        job.repairNo,
                        job.title,
                        job.category,
                        job.equipment,
                        job.location,
                        job.reporterName,
                        job.email,
                        job.description
                    ].join(" ").toLowerCase();
                    return searchableText.includes(keyword);
                }
            }["TechnicianPage.useMemo[filteredJobs]"]);
        }
    }["TechnicianPage.useMemo[filteredJobs]"], [
        jobs,
        search,
        statusFilter
    ]);
    const recentJobs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TechnicianPage.useMemo[recentJobs]": ()=>{
            return [
                ...filteredJobs
            ].sort({
                "TechnicianPage.useMemo[recentJobs]": (a, b)=>{
                    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                    return bTime - aTime;
                }
            }["TechnicianPage.useMemo[recentJobs]"]).slice(0, 8);
        }
    }["TechnicianPage.useMemo[recentJobs]"], [
        filteredJobs
    ]);
    const acceptJob = async (job)=>{
        try {
            setProcessingId(job.requestId);
            setError("");
            const response = await fetch(`/api/repair?id=${encodeURIComponent(String(job.requestId))}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    status: "progress"
                })
            });
            const data = await readApiResponse(response);
            if (!response.ok || data.success !== true) {
                throw new Error(data.error || data.message || `ไม่สามารถรับงานได้ (HTTP ${response.status})`);
            }
            setJobs((current)=>current.map((item)=>item.requestId === job.requestId ? {
                        ...item,
                        status: "progress",
                        startedAt: new Date().toISOString()
                    } : item));
            setSelectedJob(null);
            setSuccessMessage(`รับงาน ${job.repairNo} เรียบร้อยแล้ว`);
            setTimeout(()=>{
                router.push("/progress-jobs");
            }, 500);
        } catch (errorValue) {
            console.error("❌ Technician acceptJob error:", errorValue);
            const message = errorValue instanceof Error ? errorValue.message : "ไม่สามารถรับงานได้";
            setError(message);
        } finally{
            setProcessingId(null);
        }
    };
    const goTo = (path)=>{
        router.push(path);
    };
    const statusLabel = (status)=>{
        switch(status){
            case "pending":
                return "รอดำเนินการ";
            case "progress":
                return "กำลังดำเนินการ";
            case "done":
                return "เสร็จแล้ว";
            default:
                return status;
        }
    };
    const priorityLabel = (priority)=>{
        switch(priority){
            case "high":
                return "เร่งด่วน";
            case "low":
                return "ไม่เร่งด่วน";
            default:
                return "ปกติ";
        }
    };
    const priorityClass = (priority)=>{
        switch(priority){
            case "high":
                return "priority priorityHigh";
            case "low":
                return "priority priorityLow";
            default:
                return "priority priorityNormal";
        }
    };
    const statusClass = (status)=>{
        switch(status){
            case "pending":
                return "status statusPending";
            case "progress":
                return "status statusProgress";
            case "done":
                return "status statusDone";
            default:
                return "status";
        }
    };
    const cardStyle = (extra = {})=>({
            ...extra
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$jsx$2f$style$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                id: "96da2d5c87b02f6c",
                children: "*{box-sizing:border-box}html,body{color:#172033;background:#f5f7fb;margin:0;padding:0;font-family:Inter,Noto Sans Thai,Segoe UI,Arial,sans-serif}body{min-height:100vh}button,input{font:inherit}button{cursor:pointer}.technicianPage{background:#f5f7fb;min-height:100vh;display:flex}.sidebar{color:#fff;background:linear-gradient(#111827 0%,#0f172a 100%);flex-shrink:0;width:255px;height:100vh;min-height:100vh;padding:24px 16px;position:sticky;top:0;overflow-y:auto}.brand{border-bottom:1px solid #ffffff14;margin-bottom:18px;padding:8px 12px 28px}.brandTitle{letter-spacing:.3px;font-size:18px;font-weight:800}.brandSub{color:#94a3b8;margin-top:6px;font-size:12px;line-height:1.5}.navSection{gap:6px;display:grid}.navButton{color:#cbd5e1;text-align:left;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;width:100%;padding:12px 13px;transition:all .2s;display:flex}.navButton:hover{color:#fff;background:#ffffff0f}.navButton.active{color:#fff;background:#2563eb}.navIcon{background:#ffffff14;border-radius:7px;place-items:center;width:25px;height:25px;font-size:13px;display:grid}.content{flex:1;min-width:0;padding:28px}.topbar{justify-content:space-between;align-items:center;gap:18px;margin-bottom:26px;display:flex}.pageTitle{color:#0f172a;margin:0;font-size:28px;font-weight:800}.pageSubtitle{color:#64748b;margin:6px 0 0;font-size:14px}.topActions{align-items:center;gap:10px;display:flex}.refreshButton{color:#1e293b;background:#fff;border:1px solid #dbe2ea;border-radius:10px;align-items:center;gap:8px;padding:10px 14px;display:inline-flex;box-shadow:0 1px 2px #00000008}.refreshButton:hover{background:#f8fafc}.refreshButton:disabled{opacity:.6;cursor:wait}.profileBox{background:#fff;border:1px solid #e2e8f0;border-radius:12px;align-items:center;gap:10px;padding:7px 12px 7px 8px;display:flex}.avatar{color:#1d4ed8;background:#dbeafe;border-radius:10px;place-items:center;width:34px;height:34px;font-weight:800;display:grid}.profileName{color:#0f172a;font-size:13px;font-weight:700}.profileRole{color:#64748b;margin-top:2px;font-size:11px}.alert{border-radius:12px;margin-bottom:18px;padding:13px 15px;font-size:14px;line-height:1.5}.alertError{color:#991b1b;background:#fef2f2;border:1px solid #fecaca}.alertSuccess{color:#166534;background:#f0fdf4;border:1px solid #bbf7d0}.statsGrid{grid-template-columns:repeat(5,minmax(0,1fr));gap:14px;margin-bottom:24px;display:grid}.statCard{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:18px;box-shadow:0 5px 20px #0f172a09}.statTop{justify-content:space-between;align-items:center;gap:8px;display:flex}.statLabel{color:#64748b;font-size:13px;font-weight:600}.statIcon{background:#f8fafc;border-radius:10px;place-items:center;width:34px;height:34px;font-size:16px;display:grid}.statValue{color:#0f172a;margin-top:10px;font-size:30px;font-weight:800}.mainCard{background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 5px 20px #0f172a09}.cardHeader{border-bottom:1px solid #eef2f7;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;padding:20px;display:flex}.cardTitle{color:#0f172a;margin:0;font-size:17px;font-weight:800}.cardDescription{color:#64748b;margin:4px 0 0;font-size:12px}.toolbar{flex-wrap:wrap;align-items:center;gap:10px;display:flex}.searchBox{position:relative}.searchInput{color:#0f172a;background:#fff;border:1px solid #dbe2ea;border-radius:10px;outline:none;width:270px;height:40px;padding:0 13px}.searchInput:focus{border-color:#60a5fa;box-shadow:0 0 0 3px #3b82f61f}.filterButtons{flex-wrap:wrap;align-items:center;gap:6px;display:flex}.filterButton{color:#475569;background:#fff;border:1px solid #dbe2ea;border-radius:10px;height:40px;padding:0 12px;font-size:13px}.filterButton.active{color:#1d4ed8;background:#eff6ff;border-color:#2563eb;font-weight:700}.jobList{gap:12px;padding:16px;display:grid}.jobCard{background:#fff;border:1px solid #e2e8f0;border-radius:15px;padding:17px;transition:all .18s}.jobCard:hover{border-color:#bfdbfe;box-shadow:0 8px 20px #1e40af12}.jobTop{justify-content:space-between;align-items:flex-start;gap:14px;display:flex}.jobLeft{flex:1;min-width:0}.jobNo{color:#2563eb;font-size:12px;font-weight:800}.jobTitle{color:#0f172a;word-break:break-word;margin:4px 0 0;font-size:16px;font-weight:800}.badges{flex-wrap:wrap;gap:7px;display:flex}.status,.priority{white-space:nowrap;border-radius:999px;align-items:center;min-height:28px;padding:5px 9px;font-size:11px;font-weight:800;display:inline-flex}.statusPending{color:#c2410c;background:#fff7ed}.statusProgress{color:#1d4ed8;background:#eff6ff}.statusDone{color:#15803d;background:#f0fdf4}.priorityHigh{color:#b91c1c;background:#fef2f2}.priorityNormal{color:#475569;background:#f8fafc}.priorityLow{color:#15803d;background:#f0fdf4}.jobMeta{grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:16px;display:grid}.metaItem{background:#f8fafc;border-radius:11px;padding:10px 11px}.metaLabel{color:#94a3b8;margin-bottom:4px;font-size:10px}.metaValue{color:#334155;white-space:nowrap;text-overflow:ellipsis;font-size:12px;font-weight:700;overflow:hidden}.jobBottom{border-top:1px solid #eef2f7;justify-content:space-between;align-items:center;gap:12px;margin-top:15px;padding-top:13px;display:flex}.createdText{color:#64748b;font-size:11px}.jobActions{flex-wrap:wrap;gap:8px;display:flex}.button{border:0;border-radius:9px;padding:9px 12px;font-size:12px;font-weight:800}.buttonSecondary{color:#334155;background:#f1f5f9}.buttonPrimary{color:#fff;background:#2563eb}.buttonPrimary:hover{background:#1d4ed8}.buttonSecondary:hover{background:#e2e8f0}.button:disabled{opacity:.55;cursor:wait}.empty{text-align:center;color:#64748b;padding:50px 20px}.emptyIcon{background:#f8fafc;border-radius:16px;place-items:center;width:58px;height:58px;margin:0 auto 12px;font-size:24px;display:grid}.emptyTitle{color:#334155;font-weight:800}.emptyText{margin-top:5px;font-size:13px}.errorDetails{white-space:pre-wrap;word-break:break-word;background:#ffffffa6;border-radius:9px;margin-top:10px;padding:10px;font-size:12px}.modalOverlay{z-index:1000;background:#0f172a85;justify-content:center;align-items:center;padding:20px;display:flex;position:fixed;inset:0}.modal{background:#fff;border-radius:18px;width:min(760px,100%);max-height:90vh;overflow-y:auto;box-shadow:0 25px 60px #0f172a3b}.modalHeader{border-bottom:1px solid #eef2f7;justify-content:space-between;align-items:center;gap:14px;padding:19px 20px;display:flex}.modalTitle{margin:0;font-size:18px;font-weight:800}.closeButton{color:#475569;background:#f1f5f9;border:0;border-radius:10px;width:36px;height:36px;font-size:20px}.closeButton:hover{background:#e2e8f0}.modalBody{padding:20px}.detailGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;display:grid}.detailItem{background:#f8fafc;border-radius:12px;padding:12px}.detailLabel{color:#94a3b8;margin-bottom:5px;font-size:10px}.detailValue{color:#1e293b;word-break:break-word;font-size:13px;font-weight:700}.detailFull{grid-column:1/-1}.descriptionBox{border:1px solid #e2e8f0;border-radius:13px;margin-top:14px;padding:14px}.descriptionTitle{color:#334155;margin-bottom:8px;font-size:12px;font-weight:800}.descriptionText{white-space:pre-wrap;color:#475569;font-size:13px;line-height:1.7}.imageBox{margin-top:14px}.imageBox img{object-fit:contain;background:#f8fafc;border:1px solid #e2e8f0;border-radius:13px;width:100%;max-height:330px}.modalFooter{border-top:1px solid #eef2f7;flex-wrap:wrap;justify-content:flex-end;gap:8px;padding:16px 20px;display:flex}.loadingGrid{gap:12px;padding:16px;display:grid}.skeleton{background:linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 37%,#f1f5f9 63%) 0 0/400% 100%;border-radius:15px;height:150px;animation:1.4s infinite skeletonMove}@keyframes skeletonMove{0%{background-position:100% 0}to{background-position:-100% 0}}@media (width<=1180px){.statsGrid{grid-template-columns:repeat(3,minmax(0,1fr))}.jobMeta{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (width<=900px){.sidebar{width:76px;padding:18px 9px}.brandTitle,.brandSub,.navButton span:last-child{display:none}.brand{padding-left:7px;padding-right:7px}.navButton{justify-content:center;padding-left:8px;padding-right:8px}.content{padding:20px}.topbar{flex-direction:column;align-items:flex-start}.statsGrid{grid-template-columns:repeat(2,minmax(0,1fr))}.searchInput{width:min(100%,320px)}}@media (width<=640px){.sidebar{display:none}.content{padding:14px}.pageTitle{font-size:22px}.statsGrid{grid-template-columns:1fr 1fr}.cardHeader{align-items:flex-start}.toolbar,.searchBox,.searchInput{width:100%}.jobTop{flex-direction:column}.jobMeta{grid-template-columns:1fr}.jobBottom{flex-direction:column;align-items:flex-start}.detailGrid{grid-template-columns:1fr}.detailFull{grid-column:auto}.profileBox{display:none}}"
            }, void 0, false, void 0, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "jsx-96da2d5c87b02f6c" + " " + "technicianPage",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "jsx-96da2d5c87b02f6c" + " " + "sidebar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-96da2d5c87b02f6c" + " " + "brand",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "brandTitle",
                                        children: "CMU IT SERVICE CENTER"
                                    }, void 0, false, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1558,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "brandSub",
                                        children: [
                                            "ระบบจัดการงานแจ้งซ่อม",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                                className: "jsx-96da2d5c87b02f6c"
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1563,
                                                columnNumber: 15
                                            }, this),
                                            "คณะสังคมศาสตร์ มหาวิทยาลัยเชียงใหม่"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1561,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                lineNumber: 1557,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "jsx-96da2d5c87b02f6c" + " " + "navSection",
                                children: navItems.map((item)=>{
                                    const active = item.path === "/technician";
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>goTo(item.path),
                                        className: "jsx-96da2d5c87b02f6c" + " " + `navButton ${active ? "active" : ""}`,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "navIcon",
                                                children: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1589,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "jsx-96da2d5c87b02f6c",
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1593,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, item.path, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1581,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                lineNumber: 1568,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                        lineNumber: 1556,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "jsx-96da2d5c87b02f6c" + " " + "content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "jsx-96da2d5c87b02f6c" + " " + "topbar",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "pageTitle",
                                                children: "Technician Center"
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1604,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "pageSubtitle",
                                                children: "ภาพรวมและรายการงานแจ้งซ่อมสำหรับเจ้าหน้าที่ช่าง"
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1608,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1603,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "topActions",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>void loadRepairs(true),
                                                disabled: refreshing,
                                                className: "jsx-96da2d5c87b02f6c" + " " + "refreshButton",
                                                children: refreshing ? "กำลังโหลด..." : "↻ รีเฟรช"
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1614,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "profileBox",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "avatar",
                                                        children: "ช"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1624,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-96da2d5c87b02f6c" + " " + "profileName",
                                                                children: "ช่าง IT"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1629,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-96da2d5c87b02f6c" + " " + "profileRole",
                                                                children: "Technician"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1633,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1628,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1623,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1613,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                lineNumber: 1602,
                                columnNumber: 11
                            }, this),
                            successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-96da2d5c87b02f6c" + " " + "alert alertSuccess",
                                children: [
                                    "✓ ",
                                    successMessage
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                lineNumber: 1642,
                                columnNumber: 13
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "jsx-96da2d5c87b02f6c" + " " + "alert alertError",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "jsx-96da2d5c87b02f6c",
                                        children: "ไม่สามารถดึงข้อมูลแจ้งซ่อมได้"
                                    }, void 0, false, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1649,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "errorDetails",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1653,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                lineNumber: 1648,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-96da2d5c87b02f6c" + " " + "statsGrid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "statCard",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "statTop",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "statLabel",
                                                        children: "งานทั้งหมด"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1662,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "statIcon",
                                                        children: "☷"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1665,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1661,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "statValue",
                                                children: statistics.total
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1670,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1660,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "statCard",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "statTop",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "statLabel",
                                                        children: "งานใหม่"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1677,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "statIcon",
                                                        children: "✉"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1680,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1676,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "statValue",
                                                children: statistics.pending
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1685,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1675,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "statCard",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "statTop",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "statLabel",
                                                        children: "กำลังดำเนินการ"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1692,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "statIcon",
                                                        children: "↻"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1695,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1691,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "statValue",
                                                children: statistics.progress
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1700,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1690,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "statCard",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "statTop",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "statLabel",
                                                        children: "เสร็จแล้ว"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1707,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "statIcon",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1710,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1706,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "statValue",
                                                children: statistics.done
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1715,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1705,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "statCard",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "statTop",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "statLabel",
                                                        children: "งานเร่งด่วน"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1722,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "statIcon",
                                                        children: "!"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1725,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1721,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "statValue",
                                                children: statistics.urgent
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1730,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1720,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                lineNumber: 1659,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "jsx-96da2d5c87b02f6c" + " " + "mainCard",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "cardHeader",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "cardTitle",
                                                        children: "รายการแจ้งซ่อม"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1739,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "cardDescription",
                                                        children: "แสดงรายการงานทั้งหมดจากระบบแจ้งซ่อม"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1743,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1738,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "toolbar",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "searchBox",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            placeholder: "ค้นหาเลขงาน / อุปกรณ์ / สถานที่...",
                                                            value: search,
                                                            onChange: (event)=>setSearch(event.target.value),
                                                            className: "jsx-96da2d5c87b02f6c" + " " + "searchInput"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                            lineNumber: 1750,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1749,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "filterButtons",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setStatusFilter("all"),
                                                                className: "jsx-96da2d5c87b02f6c" + " " + `filterButton ${statusFilter === "all" ? "active" : ""}`,
                                                                children: "ทั้งหมด"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1764,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setStatusFilter("pending"),
                                                                className: "jsx-96da2d5c87b02f6c" + " " + `filterButton ${statusFilter === "pending" ? "active" : ""}`,
                                                                children: "งานใหม่"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1778,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setStatusFilter("progress"),
                                                                className: "jsx-96da2d5c87b02f6c" + " " + `filterButton ${statusFilter === "progress" ? "active" : ""}`,
                                                                children: "กำลังทำ"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1792,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>setStatusFilter("done"),
                                                                className: "jsx-96da2d5c87b02f6c" + " " + `filterButton ${statusFilter === "done" ? "active" : ""}`,
                                                                children: "เสร็จแล้ว"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1806,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1763,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1748,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1737,
                                        columnNumber: 13
                                    }, this),
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "loadingGrid",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "skeleton"
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1825,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "skeleton"
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1826,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "skeleton"
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1827,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1824,
                                        columnNumber: 15
                                    }, this) : recentJobs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "empty",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "emptyIcon",
                                                children: error ? "!" : "✓"
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1831,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "emptyTitle",
                                                children: error ? "โหลดข้อมูลไม่สำเร็จ" : "ไม่พบรายการแจ้งซ่อม"
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1835,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "emptyText",
                                                children: error ? "ตรวจสอบ API / ฐานข้อมูล แล้วกดรีเฟรชอีกครั้ง" : "ยังไม่มีรายการที่ตรงกับเงื่อนไขค้นหา"
                                            }, void 0, false, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1841,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1830,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "jsx-96da2d5c87b02f6c" + " " + "jobList",
                                        children: recentJobs.map((job)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                className: "jsx-96da2d5c87b02f6c" + " " + "jobCard",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "jobTop",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-96da2d5c87b02f6c" + " " + "jobLeft",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "jobNo",
                                                                        children: job.repairNo
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1856,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "jobTitle",
                                                                        children: job.title
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1860,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1855,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-96da2d5c87b02f6c" + " " + "badges",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + (statusClass(job.status) || ""),
                                                                        children: statusLabel(job.status)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1866,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + (priorityClass(job.priority) || ""),
                                                                        children: priorityLabel(job.priority)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1874,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1865,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1854,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "jobMeta",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-96da2d5c87b02f6c" + " " + "metaItem",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "metaLabel",
                                                                        children: "อุปกรณ์"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1888,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "metaValue",
                                                                        children: job.equipment
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1892,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1887,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-96da2d5c87b02f6c" + " " + "metaItem",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "metaLabel",
                                                                        children: "สถานที่"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1898,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "metaValue",
                                                                        children: job.location
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1902,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1897,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-96da2d5c87b02f6c" + " " + "metaItem",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "metaLabel",
                                                                        children: "ผู้แจ้ง"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1908,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "metaValue",
                                                                        children: job.reporterName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1912,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1907,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-96da2d5c87b02f6c" + " " + "metaItem",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "metaLabel",
                                                                        children: "วันที่แจ้ง"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1918,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "metaValue",
                                                                        children: formatShortDate(job.createdAt)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1922,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1917,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1886,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "jsx-96da2d5c87b02f6c" + " " + "jobBottom",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-96da2d5c87b02f6c" + " " + "createdText",
                                                                children: [
                                                                    "แจ้งเมื่อ",
                                                                    " ",
                                                                    formatDate(job.createdAt)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1931,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "jsx-96da2d5c87b02f6c" + " " + "jobActions",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>setSelectedJob(job),
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "button buttonSecondary",
                                                                        children: "ดูรายละเอียด"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1937,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    job.status === "pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        disabled: processingId === job.requestId,
                                                                        onClick: ()=>void acceptJob(job),
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "button buttonPrimary",
                                                                        children: processingId === job.requestId ? "กำลังรับงาน..." : "รับงาน"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1948,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    job.status === "progress" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>goTo("/progress-jobs"),
                                                                        className: "jsx-96da2d5c87b02f6c" + " " + "button buttonPrimary",
                                                                        children: "ไปหน้างานกำลังทำ"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                        lineNumber: 1967,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                                lineNumber: 1936,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                        lineNumber: 1930,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, job.requestId, true, {
                                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                lineNumber: 1850,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                                        lineNumber: 1848,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/technician/new-jobs/page.tsx",
                                lineNumber: 1736,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/technician/new-jobs/page.tsx",
                        lineNumber: 1601,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/technician/new-jobs/page.tsx",
                lineNumber: 1555,
                columnNumber: 7
            }, this),
            selectedJob && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onMouseDown: (event)=>{
                    if (event.target === event.currentTarget) {
                        setSelectedJob(null);
                    }
                },
                className: "jsx-96da2d5c87b02f6c" + " " + "modalOverlay",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "jsx-96da2d5c87b02f6c" + " " + "modal",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-96da2d5c87b02f6c" + " " + "modalHeader",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-96da2d5c87b02f6c",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "modalTitle",
                                            children: "รายละเอียดการแจ้งซ่อม"
                                        }, void 0, false, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2001,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginTop: 4,
                                                color: "#64748b",
                                                fontSize: 12
                                            },
                                            className: "jsx-96da2d5c87b02f6c",
                                            children: selectedJob.repairNo
                                        }, void 0, false, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2005,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                    lineNumber: 2000,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setSelectedJob(null),
                                    className: "jsx-96da2d5c87b02f6c" + " " + "closeButton",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                    lineNumber: 2016,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                            lineNumber: 1999,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-96da2d5c87b02f6c" + " " + "modalBody",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailGrid",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "detailItem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailLabel",
                                                    children: "หัวข้อ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2030,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailValue",
                                                    children: selectedJob.title
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2034,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2029,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "detailItem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailLabel",
                                                    children: "สถานะ"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2040,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailValue",
                                                    children: statusLabel(selectedJob.status)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2044,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2039,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "detailItem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailLabel",
                                                    children: "ประเภท"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2052,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailValue",
                                                    children: selectedJob.category
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2056,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2051,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "detailItem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailLabel",
                                                    children: "อุปกรณ์"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2062,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailValue",
                                                    children: selectedJob.equipment
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2066,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2061,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "detailItem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailLabel",
                                                    children: "สถานที่"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2072,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailValue",
                                                    children: selectedJob.location
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2076,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2071,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "detailItem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailLabel",
                                                    children: "ระดับความเร่งด่วน"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2082,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailValue",
                                                    children: priorityLabel(selectedJob.priority)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2086,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2081,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "detailItem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailLabel",
                                                    children: "ผู้แจ้ง"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2094,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailValue",
                                                    children: selectedJob.reporterName
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2098,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2093,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "detailItem",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailLabel",
                                                    children: "อีเมล"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2104,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailValue",
                                                    children: selectedJob.email
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2108,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2103,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "detailItem detailFull",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailLabel",
                                                    children: "วันที่แจ้ง"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2114,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "jsx-96da2d5c87b02f6c" + " " + "detailValue",
                                                    children: formatDate(selectedJob.createdAt)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                                    lineNumber: 2118,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2113,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                    lineNumber: 2028,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-96da2d5c87b02f6c" + " " + "descriptionBox",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "descriptionTitle",
                                            children: "รายละเอียดปัญหา"
                                        }, void 0, false, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2127,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "jsx-96da2d5c87b02f6c" + " " + "descriptionText",
                                            children: selectedJob.description
                                        }, void 0, false, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2131,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                    lineNumber: 2126,
                                    columnNumber: 15
                                }, this),
                                selectedJob.imagePath && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "jsx-96da2d5c87b02f6c" + " " + "imageBox",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            style: {
                                                marginBottom: 8
                                            },
                                            className: "jsx-96da2d5c87b02f6c" + " " + "descriptionTitle",
                                            children: "รูปภาพประกอบ"
                                        }, void 0, false, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2138,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: selectedJob.imagePath,
                                            alt: "รูปภาพประกอบการแจ้งซ่อม",
                                            onError: (event)=>{
                                                event.currentTarget.style.display = "none";
                                            },
                                            className: "jsx-96da2d5c87b02f6c"
                                        }, void 0, false, {
                                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                                            lineNumber: 2147,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                    lineNumber: 2137,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                            lineNumber: 2027,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "jsx-96da2d5c87b02f6c" + " " + "modalFooter",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setSelectedJob(null),
                                    className: "jsx-96da2d5c87b02f6c" + " " + "button buttonSecondary",
                                    children: "ปิด"
                                }, void 0, false, {
                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                    lineNumber: 2162,
                                    columnNumber: 15
                                }, this),
                                selectedJob.status === "pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: processingId === selectedJob.requestId,
                                    onClick: ()=>void acceptJob(selectedJob),
                                    className: "jsx-96da2d5c87b02f6c" + " " + "button buttonPrimary",
                                    children: processingId === selectedJob.requestId ? "กำลังรับงาน..." : "รับงานนี้"
                                }, void 0, false, {
                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                    lineNumber: 2173,
                                    columnNumber: 17
                                }, this),
                                selectedJob.status === "progress" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>goTo("/progress-jobs"),
                                    className: "jsx-96da2d5c87b02f6c" + " " + "button buttonPrimary",
                                    children: "ดูงานที่กำลังดำเนินการ"
                                }, void 0, false, {
                                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                                    lineNumber: 2192,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/technician/new-jobs/page.tsx",
                            lineNumber: 2161,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/technician/new-jobs/page.tsx",
                    lineNumber: 1998,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/technician/new-jobs/page.tsx",
                lineNumber: 1988,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/technician/new-jobs/page.tsx",
        lineNumber: 730,
        columnNumber: 5
    }, this);
}
_s(TechnicianPage, "pjOsFEB+62N9JVze02zgfKNHvBA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = TechnicianPage;
var _c;
__turbopack_context__.k.register(_c, "TechnicianPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_technician_new-jobs_page_tsx_1we_0x2._.js.map