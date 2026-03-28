import { AppShell } from "@/components/app-shell";
import { AuthRegisterForm } from "@/components/forum/auth-register-form";

export default function RegisterPage() {
  return (
    <AppShell current="forum">
      <section className="panel form-card">
        <div className="eyebrow">注册</div>
        <h1>创建烟灰缸账号</h1>
        <p className="section-copy">
          注册后自动登录，账号信息会写入本地数据层（file 或 database 驱动）。
        </p>
        <AuthRegisterForm />
      </section>
    </AppShell>
  );
}
