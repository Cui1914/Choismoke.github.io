"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { AuthUser, UserStatusAction } from "@/lib/forum/types";

type AdminUserStatusTableProps = {
  users: AuthUser[];
};

const statusTextMap: Record<string, string> = {
  active: "正常",
  muted: "禁言中",
  banned: "已封禁",
};

const actionTextMap: Record<UserStatusAction, string> = {
  restore: "恢复",
  mute7d: "禁言 7 天",
  banPermanent: "永久封禁",
};

export function AdminUserStatusTable({ users }: AdminUserStatusTableProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [runningUserId, setRunningUserId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  function runAction(userId: string, action: UserStatusAction) {
    setRunningUserId(userId);
    startTransition(async () => {
      const adminToken = process.env.NEXT_PUBLIC_FORUM_ADMIN_TOKEN;
      const response = await fetch("/api/forum/user-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminToken ? { "x-admin-token": adminToken } : {}),
        },
        body: JSON.stringify({ userId, action }),
      });

      const result = (await response.json()) as { ok: boolean; message: string };
      setMessage(result.message);
      setRunningUserId(null);
      router.refresh();
    });
  }

  return (
    <div className="stack">
      {users.map((user) => {
        const busy = pending && runningUserId === user.id;
        return (
          <div className="table-row admin-row-block" key={user.id}>
            <strong>{user.username}</strong>
            <span>状态：{statusTextMap[user.status ?? "active"]}</span>
            <span>举报计数：{user.reportCount ?? 0}</span>
            <span>邮箱：{user.email}</span>
            <div className="moderation-actions">
              <button className="button" disabled={busy} onClick={() => runAction(user.id, "restore")}>
                {actionTextMap.restore}
              </button>
              <button className="button" disabled={busy} onClick={() => runAction(user.id, "mute7d")}>
                {actionTextMap.mute7d}
              </button>
              <button className="button primary" disabled={busy} onClick={() => runAction(user.id, "banPermanent")}>
                {actionTextMap.banPermanent}
              </button>
            </div>
          </div>
        );
      })}
      {message ? <p className="status-copy">{message}</p> : null}
    </div>
  );
}
