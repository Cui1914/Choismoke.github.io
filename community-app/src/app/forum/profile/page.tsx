import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ActivityFeed } from "@/components/forum/activity-feed";
import { ProfileSummaryCard } from "@/components/forum/profile-summary-card";
import { SidebarListPanel } from "@/components/forum/sidebar-list-panel";
import { StatsGrid } from "@/components/forum/stats-grid";
import { getForumProfile } from "@/lib/forum/service";

export default async function ProfilePage() {
  const { highlights, recentActivity, recentThreads, relationStats, stats, summary } =
    await getForumProfile();

  return (
    <AppShell current="forum">
      <div className="stack">
        <ProfileSummaryCard
          name={summary.name}
          description={summary.description}
          metaItems={summary.metaItems}
          tags={summary.tags}
        />

        <StatsGrid items={stats} />

        <div className="layout-grid">
          <section className="stack">
            <section className="panel">
              <div className="field-row" style={{ justifyContent: "space-between" }}>
                <h2>最近发帖</h2>
                <Link className="button" href="/forum/thread">
                  查看帖子
                </Link>
              </div>
              <ul className="list">
                {recentThreads.items.map((thread) => (
                  <li key={thread.label}>{thread.label}</li>
                ))}
              </ul>
            </section>

            <ActivityFeed title="最近动态" items={recentActivity.items} />
          </section>

          <aside className="stack">
            <SidebarListPanel title="个人侧重点" items={highlights.items} />

            <section className="helper-card">
              <div className="eyebrow">关系概览</div>
              <h3>关注与好友</h3>
              <div className="meta-row">
                {relationStats.map((item) => (
                  <span key={item.label}>
                    {item.label} {item.value}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
