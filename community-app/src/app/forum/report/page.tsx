import { AppShell } from "@/components/app-shell";
import { ReportForm } from "@/components/forum/report-form";
import { getAuthSession } from "@/lib/forum/auth-service";

export default async function ReportPage() {
  const session = await getAuthSession();
  const currentUser = session.user?.username ?? "访客";

  return (
    <AppShell current="forum">
      <div className="auth-layout">
        <section className="panel form-card">
          <div className="eyebrow">Report</div>
          <h1>举报内容</h1>
          <p className="section-copy">
            当前产品规则是先隐藏后审核。这一页现在会把举报真正提交到本地数据接口。
          </p>
          <ReportForm
            currentUser={currentUser}
            defaultTargetId="thread-product-vs-polish"
            defaultTargetLabel="帖子：做个人项目时，你会先保证功能闭环还是先打磨质感？"
          />
        </section>

        <aside className="stack">
          <section className="panel">
            <h3>处理规则</h3>
            <ul className="list">
              <li>举报进入本地数据后，目标内容先隐藏。</li>
              <li>管理员再决定恢复、删除、禁言 7 天或永久封禁。</li>
              <li>连续累计举报会逐步形成账号风险记录。</li>
            </ul>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
