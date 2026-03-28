import { NextRequest, NextResponse } from "next/server";
import { updateUserSettings } from "@/lib/forum/auth-service";
import { requireAuthenticatedUser } from "@/lib/forum/api-guard";

export async function POST(request: NextRequest) {
  const guard = await requireAuthenticatedUser(request, "settings");
  if (!guard.ok) {
    return guard.response;
  }

  try {
    const payload = await request.json();
    const result = await updateUserSettings(guard.user.id, payload);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "设置保存失败。",
      },
      { status: 400 },
    );
  }
}
