import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { ForumThreadCard } from "@/components/forum/forum-thread-card";
import { PageIntro } from "@/components/forum/page-intro";
import { QuickLinksPanel } from "@/components/forum/quick-links-panel";
import { SidebarListPanel } from "@/components/forum/sidebar-list-panel";
import { StatsGrid } from "@/components/forum/stats-grid";
import { forumHomeMock } from "@/lib/forum/mock-data";

export default function ForumPage() {
  const {
    announcement,
    categories,
    hotTags,
    intro,
    quickLinks,
    stats,
    threads,
    hotTopics,
    activeUsers,
  } = forumHomeMock;

  return (
    <AppShell current="forum">
      <div className="stack">
        <PageIntro
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
          metaItems={intro.metaItems}
          actions={
            <>
              <Link className="button primary" href="/forum/register">
                注册
              </Link>
              <Link className="button" href="/forum/login">
                登录
              </Link>
              <Link className="button" href="/forum/compose">
                发帖
              </Link>
              <Link className="button" href="/forum/announcements">
                公告
              </Link>
            </>
          }
          variant="panel"
        />

        <section className="announcement">
          <div className="eyebrow">系统说明</div>
          <h2>{announcement.title}</h2>
          <p className="section-copy">{announcement.body}</p>
        </section>

        <StatsGrid items={stats} />

        <div className="layout-grid">
          <section className="stack">
            <div className="toolbar">
              <div className="field-row">
                <span className="tag">综合</span>
                <span className="tag">最新</span>
                <span className="tag">最热</span>
              </div>
              <label className="search">
                <span>搜索</span>
                <input placeholder="标题 / 正文 / 标签 / 用户" />
              </label>
            </div>

            <div className="tag-row">
              {categories.map((category) => (
                <Link key={category.id} className="tag" href="/forum/category">
                  {category.name} · {category.threadCount}
                </Link>
              ))}
            </div>

            {threads.items.map((thread) => (
              <ForumThreadCard key={thread.id} thread={thread} />
            ))}
          </section>

          <aside className="stack">
            <QuickLinksPanel links={quickLinks} />

            <section className="panel">
              <h3>热门标签</h3>
              <div className="tag-row">
                {hotTags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <SidebarListPanel
              title="今日热帖"
              items={hotTopics.items.map((topic) => ({
                label: topic.title,
                href: "/forum/thread",
              }))}
            />

            <SidebarListPanel
              title="活跃用户"
              items={activeUsers.items.map((user) => ({
                label: `${user.name} · ${user.posts} 帖`,
                href: "/forum/profile",
              }))}
            />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
