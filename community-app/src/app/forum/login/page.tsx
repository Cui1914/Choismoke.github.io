import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function LoginPage() {
  return (
    <AppShell current="forum">
      <section className="panel form-card">
        <div className="eyebrow">登录</div>
        <h1>登录烟灰缸</h1>
        <p className="section-copy">
          登录后可以发帖、回复、点赞、收藏、关注他人并使用私信功能。
        </p>
        <form className="form-grid">
          <div className="field">
            <label htmlFor="email">邮箱</label>
            <input id="email" type="email" placeholder="you@example.com" />
            <div className="hint">会校验邮箱格式，并给出常见邮箱后缀提示。</div>
          </div>
          <div className="field">
            <label htmlFor="password">密码</label>
            <input id="password" type="password" placeholder="输入密码" />
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
