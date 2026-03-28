import { AppShell } from "@/components/app-shell";
import { AuthLoginForm } from "@/components/forum/auth-login-form";
import { getAuthSession } from "@/lib/forum/auth-service";

export default async function LoginPage() {
  const session = await getAuthSession();

  return (
    <AppShell current="forum">
      <section className="panel form-card">
        <div className="eyebrow">登录</div>
        <h1>登录烟灰缸</h1>
        <p className="section-copy">
          使用邮箱和密码登录。登录后可发帖、评论、私信和举报。
        </p>
        {session.restrictionReason ? (
          <div className="notice-inline">
            <strong>账号当前受限</strong>
            <p>{session.restrictionReason}</p>
          </div>
        ) : null}
        <AuthLoginForm />
      </section>
    </AppShell>
  );
}
