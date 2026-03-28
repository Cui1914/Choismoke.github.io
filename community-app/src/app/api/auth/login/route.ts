import { NextRequest, NextResponse } from "next/server";
import { loginWithEmail } from "@/lib/forum/auth-service";
import { clearLoggedInCookie, setLoggedInCookie } from "@/lib/forum/session-cookie";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const result = await loginWithEmail(payload);
  const response = NextResponse.json(result, { status: result.ok ? 200 : 400 });

  if (result.ok && result.sessionToken) {
    setLoggedInCookie(response, result.sessionToken);
  } else {
    clearLoggedInCookie(response);
  }

  return response;
}
