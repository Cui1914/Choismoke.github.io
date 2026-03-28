"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AuthLoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    startTransition(async () => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
        <label htmlFor="email">邮箱</label>
        <input id="email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="field">
        <label htmlFor="password">密码</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="输入至少 6 位密码"
          minLength={6}
          required
        />
      </div>
      <div className="field-row" style={{ justifyContent: "space-between" }}>
        <span className="hint">接口：`/api/auth/login`、`/api/auth/session`</span>
      </div>
      <div className="action-row">
        <button className="button primary" type="submit" disabled={pending}>
          {pending ? "登录中..." : "登录"}
        </button>
      </div>
      {message ? <p className="status-copy">{message}</p> : null}
    </form>
  );
}
