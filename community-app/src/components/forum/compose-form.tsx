"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type ComposeFormProps = {
  canPost: boolean;
};

export function ComposeForm({ canPost }: ComposeFormProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  function handleSubmit(formData: FormData) {
    const title = String(formData.get("title") ?? "").trim();
    const category = String(formData.get("category") ?? "技术");
    const body = String(formData.get("body") ?? "").trim();
    const tagsRaw = String(formData.get("tags") ?? "").trim();

    if (!title || !body) {
      setMessage("请先填写标题和正文。");
      return;
    }

    const tags = tagsRaw
      .split(/[，,\s]+/)
      .map((item) => item.trim())
      .filter(Boolean)
      .slice(0, 5);

    startTransition(async () => {
      const response = await fetch("/api/forum/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, category, body, tags }),
      });

      const result = (await response.json()) as { ok: boolean; message: string };
      setMessage(result.message);

      if (result.ok) {
        router.push("/forum");
        router.refresh();
      }
    });
  }

  return (
    <form className="form-grid" action={handleSubmit}>
      <div className="field">
        <label htmlFor="title">标题</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="输入标题（17 字以内）"
          maxLength={17}
          disabled={!canPost || pending}
        />
      </div>
      <div className="field">
        <label htmlFor="category">分类</label>
        <select id="category" name="category" disabled={!canPost || pending} defaultValue="技术">
          <option>技术</option>
          <option>生活</option>
          <option>游戏</option>
          <option>随便聊</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="body">正文</label>
        <textarea
          id="body"
          name="body"
          placeholder="输入正文（300 字以内）"
          maxLength={300}
          disabled={!canPost || pending}
        />
      </div>
      <div className="field">
        <label htmlFor="tags">标签</label>
        <input
          id="tags"
          name="tags"
          type="text"
          placeholder="最多 5 个，支持空格或逗号分隔"
          disabled={!canPost || pending}
        />
      </div>
      <div className="field-row" style={{ justifyContent: "space-between" }}>
        <span className="hint">接口：`/api/forum/threads`</span>
        <button className="button primary" type="submit" disabled={!canPost || pending}>
          {pending ? "发布中..." : "发布帖子"}
        </button>
      </div>
      {message ? <p className="status-copy">{message}</p> : null}
    </form>
  );
}
