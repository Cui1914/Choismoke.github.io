"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export function AuthRegisterForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    const payload = {
      username: String(formData.get("username") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? "").trim(),
      bio: String(formData.get("bio") ?? "").trim(),
    };

    startTransition(async () => {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        <label htmlFor="username">用户名</label>
        <input id="username" name="username" type="text" placeholder="输入 2-10 位用户名" minLength={2} maxLength={10} required />
      </div>
      <div className="field">
        <label htmlFor="email">邮箱</label>
        <input id="email" name="email" type="email" placeholder="name@gmail.com" required />
      </div>
      <div className="field">
        <label htmlFor="password">密码</label>
        <input id="password" name="password" type="password" placeholder="设置至少 6 位密码" minLength={6} required />
      </div>
      <div className="field">
        <label htmlFor="bio">个人简介</label>
        <textarea id="bio" name="bio" placeholder="50 字以内简介" maxLength={50} />
      </div>
      <div className="field-row" style={{ justifyContent: "space-between" }}>
        <span className="hint">接口：`/api/auth/register`</span>
      </div>
      <div className="action-row">
        <button className="button primary" type="submit" disabled={pending}>
          {pending ? "注册中..." : "注册"}
        </button>
      </div>
      {message ? <p className="status-copy">{message}</p> : null}
    </form>
  );
}
