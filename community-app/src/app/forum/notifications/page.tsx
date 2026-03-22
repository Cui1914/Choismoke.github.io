import { AppShell } from "@/components/app-shell";
import { StatsGrid } from "@/components/forum/stats-grid";
import { getNotifications } from "@/lib/forum/service";

const kindLabels = {
  reply: "回复",
  like: "点赞",
  follow: "关注",
  report: "举报",
  system: "系统",
} as const;

export default async function NotificationsPage() {
  const data = await getNotifications();

  return (
    <AppShell current="forum">
      <div className="stack">
        <section className="hero">
          <div className="eyebrow">通知</div>
          <h1>通知中心</h1>
          <p className="lead">
            回复、点赞、关注、举报处理结果和系统公告都会统一收进这里。下一步接真实通知时，这一页不需要重做，只需要把数据替换成真实内容。
          </p>
        </section>

        <StatsGrid items={data.stats} />

        <div className="layout-grid">
          <section className="stack">
            <div className="toolbar">
              <div className="field-row">
                {data.filters.map((filter) => (
                  <span className="tag" key={filter}>
                    {filter}
                  </span>
                ))}
              </div>
              <div className="hint">当前有 12 条未读，后续可接 `/api/forum/notifications/read`</div>
            </div>

            <section className="table-card">
              {data.items.items.map((item) => (
                <article
                  className={`notice-card ${item.unread ? "is-unread" : ""}`}
                  key={item.id}
                >
                  <div className="notice-head">
                    <div className="field-row">
                      <span className="tag">{kindLabels[item.kind]}</span>
                      {item.unread ? <span className="tag">未读</span> : null}
                    </div>
                    <span className="hint">{item.time}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <div className="meta-row">
                    <span>打开</span>
                    <span>标记为已读</span>
                  </div>
                </article>
              ))}
            </section>
          </section>

          <aside className="stack">
            <section className="panel">
              <h3>通知准备状态</h3>
              <ul className="list">
                <li>通知列表接口已存在。</li>
                <li>标记已读接口占位已存在。</li>
                <li>后续只需要接真实用户通知数据。</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
