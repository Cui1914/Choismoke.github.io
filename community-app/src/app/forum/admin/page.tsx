import { AppShell } from "@/components/app-shell";
import { AdminUserStatusTable } from "@/components/forum/admin-user-status-table";
import { ModerationQueue } from "@/components/forum/moderation-queue";
import { InfoCard } from "@/components/forum/info-card";
import { StatsGrid } from "@/components/forum/stats-grid";
import { getAdminDashboard, getAdminUsers } from "@/lib/forum/service";

export default async function AdminPage() {
  const [dashboard, users] = await Promise.all([getAdminDashboard(), getAdminUsers()]);

  return (
    <AppShell current="forum">
      <div className="stack">
        <section className="hero">
          <div className="eyebrow">Admin Preview</div>
          <h1>烟灰缸后台</h1>
          <p className="lead">
            这一版已经把举报处理和用户状态管理都接到了本地数据层，后面可以直接平滑升级到真实后台。
          </p>
        </section>

        <StatsGrid items={dashboard.stats} />

        <section className="helper-grid">
          <InfoCard
            eyebrow="Queue"
            title="处理队列"
            description="举报提交后先隐藏目标，再由管理动作执行恢复、删除、禁言或封禁。"
          />
          <InfoCard
            eyebrow="Users"
            title="用户状态"
            description="支持直接调整用户状态，已覆盖正常、禁言和封禁三种状态。"
          />
          <InfoCard
            eyebrow="Actions"
            title="管理记录"
            description="每一次管理动作都会记录进本地数据，方便后续审计和回溯。"
          />
        </section>

        <section className="table-card">
          <div className="field-row" style={{ justifyContent: "space-between" }}>
            <h2>最新举报</h2>
            <span className="section-copy">接口：/api/forum/report 与 /api/forum/moderation</span>
          </div>
          <ModerationQueue reports={dashboard.reports.items} />
        </section>

        <section className="table-card">
          <div className="field-row" style={{ justifyContent: "space-between" }}>
            <h2>用户状态管理</h2>
            <span className="section-copy">接口：/api/forum/user-status</span>
          </div>
          <AdminUserStatusTable users={users} />
        </section>

        <section className="panel stack">
          <h2>最近管理动作</h2>
          <ul className="list">
            {dashboard.recentActions.items.map((item) => (
              <li key={item.label}>{item.label}</li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
