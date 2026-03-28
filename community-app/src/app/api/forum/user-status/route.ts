import { NextRequest, NextResponse } from "next/server";
import { updateUserStatus } from "@/lib/forum/service";
import { verifyAdminRequest } from "@/lib/forum/admin-guard";
import type { AdminUserStatusPayload } from "@/lib/forum/types";

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return "unknown";
}

export async function POST(request: NextRequest) {
  const guard = verifyAdminRequest(request);
  if (!guard.ok) {
    return NextResponse.json({ ok: false, message: guard.message }, { status: guard.status });
  }

  const payload = (await request.json()) as AdminUserStatusPayload;
  const result = await updateUserStatus(payload, {
    operatorId: "admin",
    sourceIp: getClientIp(request),
    userAgent: request.headers.get("user-agent") ?? "unknown",
  });
  return NextResponse.json(result, { status: result.ok ? 200 : 404 });
}
