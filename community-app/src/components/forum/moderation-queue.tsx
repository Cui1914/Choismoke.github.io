"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ModerationActionPayload, ModerationQueueItem } from "@/lib/forum/types";

const statusLabelMap = {
  pending: "待处理",
  hidden: "已隐藏",
  resolved: "已处理",
  rejected: "已驳回",
} as const;

const typeLabelMap = {
  thread: "帖子",
  comment: "评论",
  user: "用户",
} as const;

type ModerationQueueProps = {
  reports: ModerationQueueItem[];
};

export function ModerationQueue({ reports }: ModerationQueueProps) {
  const router = useRouter();
  const [pendingReportId, setPendingReportId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function runAction(reportId: string, action: ModerationActionPayload["action"]) {
    setPendingReportId(reportId);
    startTransition(async () => {
      const adminToken = process.env.NEXT_PUBLIC_FORUM_ADMIN_TOKEN;
      const response = await fetch("/api/forum/moderation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminToken ? { "x-admin-token": adminToken } : {}),
        },
        body: JSON.stringify({ reportId, action }),
      });

      const result = (await response.json()) as { ok: boolean; message: string };
      setMessage(result.message);
      setPendingReportId(null);
      router.refresh();
    });
  }

  if (reports.length === 0) {
    return <p className="section-copy">当前还没有进入本地数据的举报记录。</p>;
  }

  return (
    <div className="stack">
      {reports.map((report) => {
        const disabled = pending && pendingReportId === report.id;
        return (
          <div className="table-row admin-table-row admin-row-block" key={report.id}>
            <strong>
              {typeLabelMap[report.targetType]}：{report.targetLabel}
            </strong>
            <span>原因：{report.reason}</span>
            <span>状态：{statusLabelMap[report.status]}</span>
            <span>提交者：{report.reporter}</span>
            <div className="moderation-actions">
              <button className="button" onClick={() => runAction(report.id, "restore")} disabled={disabled}>
                恢复
              </button>
              <button className="button" onClick={() => runAction(report.id, "delete")} disabled={disabled}>
                删除
              </button>
              <button className="button" onClick={() => runAction(report.id, "mute7d")} disabled={disabled}>
                禁言 7 天
              </button>
              <button className="button primary" onClick={() => runAction(report.id, "banPermanent")} disabled={disabled}>
                永久封禁
              </button>
            </div>
          </div>
        );
      })}
      {message ? <p className="status-copy">{message}</p> : null}
    </div>
  );
}
