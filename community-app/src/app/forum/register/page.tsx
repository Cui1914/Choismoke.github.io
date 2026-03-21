import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function RegisterPage() {
  return (
    <AppShell current="forum">
      <section className="panel form-card">
        <div className="eyebrow">注册</div>
        <h1>创建烟灰缸账号</h1>
        <p className="section-copy">
          用户名支持中文、英文、数字和下划线，长度 2-10 位，后续可修改 10 次。
        </p>
        <form className="form-grid">
          <div className="field">
            <label htmlFor="name">用户名</label>
            <input id="name" type="text" placeholder="输入 2-10 位用户名" />
          </div>
          <div className="field">
            <label htmlFor="email">邮箱</label>
            <input id="email" type="email" placeholder="name@gmail.com" />
            <div className="hint">邮箱格式正确即可注册，不强制要求邮箱验证。</div>
          </div>
          <div className="field">
            <label htmlFor="password">密码</label>
            <input id="password" type="password" placeholder="设置密码" />
          </div>
          <div className="field">
            <label htmlFor="bio">个人简介</label>
            <textarea id="bio" placeholder="50 字以内简介" />
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
