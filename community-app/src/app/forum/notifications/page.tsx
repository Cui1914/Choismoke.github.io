import { AppShell } from "@/components/app-shell";
import { StatsGrid } from "@/components/forum/stats-grid";
import { notificationsMock } from "@/lib/forum/mock-data";

const kindLabels = {
  reply: "回复",
  like: "点赞",
  follow: "关注",
  report: "举报",
  system: "系统",
} as const;

export default function NotificationsPage() {
  const data = notificationsMock;

  return (
    <AppShell current="forum">
      <div className="stack">
        <section className="hero">
          <div className="eyebrow">通知</div>
          <h1>通知中心</h1>
          <p className="lead">
            回复、点赞、关注、举报处理结果和系统公告都会统一收进这里，避免论坛体验过于嘈杂。
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
              <div className="hint">当前有 12 条未读</div>
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
              <h3>通知规则</h3>
              <ul className="list">
                <li>回复和点赞要足够及时。</li>
                <li>系统公告应该可见，但不能打扰过度。</li>
                <li>举报结果的状态说明必须明确。</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
