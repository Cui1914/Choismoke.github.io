import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function LoginPage() {
  return (
    <AppShell current="forum">
      <section className="panel form-card">
        <div className="eyebrow">登录</div>
        <h1>登录烟灰缸</h1>
        <p className="section-copy">
          这一步已经为真实邮箱登录预留好了接口入口。后续接入真实账号系统后，这里会直接变成可用的登录页。
        </p>
        <form className="form-grid">
          <div className="field">
            <label htmlFor="email">邮箱</label>
            <input id="email" type="email" placeholder="you@example.com" />
            <div className="hint">会校验邮箱格式，并提示常见邮箱后缀。</div>
          </div>
          <div className="field">
            <label htmlFor="password">密码</label>
            <input id="password" type="password" placeholder="输入至少 6 位密码" />
          </div>
          <div className="field-row" style={{ justifyContent: "space-between" }}>
            <span className="hint">后续接口：`/api/auth/login`、`/api/auth/session`</span>
            <a className="hint" href="#">
              忘记密码
            </a>
          </div>
          <div className="action-row">
            <Link className="button primary" href="/forum/profile">
              登录预览
            </Link>
            <Link className="button" href="/forum/register">
              没有账号，去注册
            </Link>
          </div>
        </form>
      </section>
    </AppShell>
  );
}
