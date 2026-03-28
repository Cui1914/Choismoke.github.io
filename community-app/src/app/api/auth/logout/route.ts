import { NextRequest, NextResponse } from "next/server";
import { logoutCurrentSession } from "@/lib/forum/auth-service";
import { clearLoggedInCookie, getLoggedInToken } from "@/lib/forum/session-cookie";

export async function POST(request: NextRequest) {
  const token = getLoggedInToken(request);
  const result = await logoutCurrentSession(token);
  const response = NextResponse.json(result);
  clearLoggedInCookie(response);
  return response;
}
