"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ReportReason, SubmitReportPayload } from "@/lib/forum/types";

type ReportFormProps = {
  defaultTargetLabel: string;
  defaultTargetId: string;
  currentUser: string;
};

export function ReportForm({ defaultTargetLabel, defaultTargetId, currentUser }: ReportFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleSubmit(formData: FormData) {
    const payload: SubmitReportPayload = {
      targetType: "thread",
      targetId: String(formData.get("targetId") ?? defaultTargetId),
      targetLabel: String(formData.get("targetLabel") ?? defaultTargetLabel),
      reason: String(formData.get("reason") ?? "感到不适") as ReportReason,
      note: String(formData.get("note") ?? ""),
    };

    startTransition(async () => {
      const response = await fetch("/api/forum/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok: boolean; message: string };
      setMessage(result.message);

      if (result.ok) {
        router.push("/forum/admin");
        router.refresh();
      }
    });
  }

  return (
    <form className="form-grid" action={handleSubmit}>
      <input type="hidden" name="targetId" value={defaultTargetId} />
      <div className="field">
        <label htmlFor="targetLabel">举报目标</label>
        <input id="targetLabel" name="targetLabel" type="text" defaultValue={defaultTargetLabel} />
      </div>
      <div className="field">
        <label htmlFor="reason">举报原因</label>
        <select id="reason" name="reason" defaultValue="感到不适">
          <option>感到不适</option>
          <option>内容不实</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="note">补充说明</label>
        <textarea
          id="note"
          name="note"
          placeholder="只补充管理员判断必须知道的信息即可。"
          defaultValue={`提交人：${currentUser}`}
        />
      </div>
      <div className="action-row">
        <button className="button primary" type="submit" disabled={pending}>
          {pending ? "提交中..." : "提交举报"}
        </button>
      </div>
      {message ? <p className="status-copy">{message}</p> : null}
    </form>
  );
}
