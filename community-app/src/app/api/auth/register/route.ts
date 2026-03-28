import { NextRequest, NextResponse } from "next/server";
import { registerWithEmail } from "@/lib/forum/auth-service";
import { clearLoggedInCookie, setLoggedInCookie } from "@/lib/forum/session-cookie";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const result = await registerWithEmail(payload);
  const response = NextResponse.json(result, { status: result.ok ? 200 : 400 });

  if (result.ok && result.sessionToken) {
    setLoggedInCookie(response, result.sessionToken);
  } else {
    clearLoggedInCookie(response);
  }

  return response;
}
