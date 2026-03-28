import type { NextRequest } from "next/server";
import { getRuntimeConfig } from "./runtime-config";

export type AdminGuardResult =
  | { ok: true }
  | {
      ok: false;
      status: 401 | 403 | 500;
      message: string;
    };

export function verifyAdminRequest(request: NextRequest): AdminGuardResult {
  const { adminApiToken } = getRuntimeConfig();
  if (!adminApiToken) {
    if (process.env.NODE_ENV !== "production") {
      return { ok: true };
    }

    return {
      ok: false,
      status: 500,
      message: "服务端未配置 FORUM_ADMIN_API_TOKEN，管理员接口已拒绝访问。",
    };
  }

  const token = request.headers.get("x-admin-token");
  if (!token) {
    return {
      ok: false,
      status: 401,
      message: "缺少管理员令牌，请在请求头携带 x-admin-token。",
    };
  }

  if (token !== adminApiToken) {
    return {
      ok: false,
      status: 403,
      message: "管理员令牌无效，已拒绝访问。",
    };
  }

  return { ok: true };
}
