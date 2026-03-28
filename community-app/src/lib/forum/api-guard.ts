import { NextRequest, NextResponse } from "next/server";
import { getAuthSessionByToken } from "./auth-service";
import { getLoggedInToken } from "./session-cookie";

type Bucket = {
  count: number;
  resetAt: number;
};

const rateLimitBuckets = new Map<string, Bucket>();

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return "unknown";
}

function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const existing = rateLimitBuckets.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= limit) {
    return false;
  }

  existing.count += 1;
  rateLimitBuckets.set(key, existing);
  return true;
}

export async function requireAuthenticatedUser(request: NextRequest, action: string) {
  const token = getLoggedInToken(request);
  if (!token) {
    return {
      ok: false as const,
      response: NextResponse.json({ ok: false, message: "请先登录后再操作。" }, { status: 401 }),
    };
  }

  const session = await getAuthSessionByToken(token);
  if (!session.isAuthenticated || !session.user) {
    return {
      ok: false as const,
      response: NextResponse.json({ ok: false, message: "登录状态已失效，请重新登录。" }, { status: 401 }),
    };
  }

  if (session.restrictionReason) {
    return {
      ok: false as const,
      response: NextResponse.json(
        {
          ok: false,
          message: session.restrictionReason,
        },
        { status: 403 },
      ),
    };
  }

  const ip = getClientIp(request);
  const rateKey = `${action}:${session.user.id}:${ip}`;
  const allowed = checkRateLimit(rateKey, 20, 60_000);

  if (!allowed) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { ok: false, message: "操作太频繁，请稍后再试。" },
        { status: 429 },
      ),
    };
  }

  return {
    ok: true as const,
    user: session.user,
    token,
    ip,
    userAgent: request.headers.get("user-agent") ?? "unknown",
  };
}
