import type { NextRequest, NextResponse } from "next/server";

export const FORUM_SESSION_COOKIE = "forum_session";

export function setLoggedInCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: FORUM_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearLoggedInCookie(response: NextResponse) {
  response.cookies.set({
    name: FORUM_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function getLoggedInToken(request: NextRequest): string | null {
  return request.cookies.get(FORUM_SESSION_COOKIE)?.value ?? null;
}
