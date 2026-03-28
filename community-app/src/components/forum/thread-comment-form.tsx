"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type ThreadCommentFormProps = {
  canComment: boolean;
  threadId: string;
};

export function ThreadCommentForm({ canComment, threadId }: ThreadCommentFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleSubmit(formData: FormData) {
    const body = String(formData.get("body") ?? "").trim();

    if (!body) {
      setMessage("请先填写评论内容。");
      return;
    }

    startTransition(async () => {
      const response = await fetch("/api/forum/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ threadId, body }),
      });

      const result = (await response.json()) as { ok: boolean; message: string };
      setMessage(result.message);

      if (result.ok) {
        router.refresh();
      }
    });
  }

  return (
    <form className="field" style={{ marginTop: 16 }} action={handleSubmit}>
      <label htmlFor="reply">回复内容</label>
      <textarea
        id="reply"
        name="body"
        maxLength={50}
        placeholder="输入评论（最多 50 字）"
        disabled={!canComment || pending}
      />
      <div className="field-row" style={{ justifyContent: "space-between" }}>
        <span className="hint">接口：`/api/forum/comments`</span>
        <button className="button primary" type="submit" disabled={!canComment || pending}>
          {pending ? "提交中..." : "提交评论"}
        </button>
      </div>
      {message ? <p className="status-copy">{message}</p> : null}
    </form>
  );
}
