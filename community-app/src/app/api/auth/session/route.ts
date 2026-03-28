import { NextRequest, NextResponse } from "next/server";
import { getAuthSessionByToken } from "@/lib/forum/auth-service";
import { getLoggedInToken } from "@/lib/forum/session-cookie";

export async function GET(request: NextRequest) {
  const token = getLoggedInToken(request);
  if (!token) {
    return NextResponse.json({
      isAuthenticated: false,
      user: null,
      canPost: false,
      canMessage: false,
      restrictionReason: "当前没有登录会话。",
    });
  }

  const session = await getAuthSessionByToken(token);
  return NextResponse.json(session);
}
