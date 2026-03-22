import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function RegisterPage() {
  return (
    <AppShell current="forum">
      <section className="panel form-card">
        <div className="eyebrow">注册</div>
        <h1>创建烟灰缸账号</h1>
        <p className="section-copy">
          这一步已经为真实邮箱注册预留好了接口入口。后续接入真实账号存储后，这里就会直接变成可用注册页。
        </p>
        <form className="form-grid">
          <div className="field">
            <label htmlFor="name">用户名</label>
            <input id="name" type="text" placeholder="输入 2-10 位用户名" />
            <div className="hint">支持中文、英文、数字和下划线，共 10 次改名机会。</div>
          </div>
          <div className="field">
            <label htmlFor="email">邮箱</label>
            <input id="email" type="email" placeholder="name@gmail.com" />
            <div className="hint">邮箱格式正确即可注册，不强制邮箱验证。</div>
          </div>
          <div className="field">
            <label htmlFor="password">密码</label>
            <input id="password" type="password" placeholder="设置至少 6 位密码" />
          </div>
          <div className="field">
            <label htmlFor="bio">个人简介</label>
            <textarea id="bio" placeholder="50 字以内简介" />
          </div>
          <div className="field-row" style={{ justifyContent: "space-between" }}>
            <span className="hint">后续接口：`/api/auth/register`</span>
            <span className="hint">注册后自动进入统一账号体系</span>
          </div>
          <div className="action-row">
            <Link className="button primary" href="/forum/profile">
              注册预览
            </Link>
            <Link className="button" href="/forum/login">
              已有账号，去登录
            </Link>
          </div>
        </form>
      </section>
    </AppShell>
  );
}
