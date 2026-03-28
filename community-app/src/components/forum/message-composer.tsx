"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type MessageComposerProps = {
  canMessage: boolean;
  threadId: string;
};

export function MessageComposer({ canMessage, threadId }: MessageComposerProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleSubmit(formData: FormData) {
    const body = String(formData.get("body") ?? "").trim();

    if (!body) {
      setMessage("请先输入消息内容。");
      return;
    }

    startTransition(async () => {
      const response = await fetch("/api/forum/messages/send", {
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
    <form className="stack" action={handleSubmit}>
      <div className="field">
        <label htmlFor="message">发送消息</label>
        <textarea
          id="message"
          name="body"
          maxLength={200}
          placeholder="单条消息最多 200 字"
          disabled={!canMessage || pending}
        />
      </div>
      <div className="action-row">
        <button className="button" type="button" disabled>
          添加图片
        </button>
        <button className="button primary" type="submit" disabled={!canMessage || pending}>
          {pending ? "发送中..." : "发送消息"}
        </button>
      </div>
      {message ? <p className="status-copy">{message}</p> : null}
    </form>
  );
}
