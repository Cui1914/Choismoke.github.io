import { AppShell } from "@/components/app-shell";
import { MessageComposer } from "@/components/forum/message-composer";
import { getAuthSession } from "@/lib/forum/auth-service";
import { getMessages } from "@/lib/forum/service";

export default async function MessagesPage() {
  const [data, session] = await Promise.all([getMessages(), getAuthSession()]);

  return (
    <AppShell current="forum">
      <div className="messaging-grid">
        <aside className="panel stack">
          <div>
            <div className="eyebrow">私信</div>
            <h2>会话列表</h2>
          </div>
          <div className="field">
            <input placeholder="搜索会话" />
          </div>
          <div className="conversation-list">
            {data.threads.items.map((thread) => (
              <article className="conversation-card" key={thread.id}>
                <div className="field-row" style={{ justifyContent: "space-between" }}>
                  <strong>{thread.name}</strong>
                  <span className="hint">{thread.time}</span>
                </div>
                <p>{thread.preview}</p>
                <div className="meta-row">
                  <span>{thread.mutualFollow ? "已互关" : "仅可先发 1 条消息"}</span>
                  {thread.unreadCount > 0 ? <span>{thread.unreadCount} 条未读</span> : null}
                </div>
              </article>
            ))}
          </div>
        </aside>

        <section className="stack">
          <section className="panel">
            <div className="field-row" style={{ justifyContent: "space-between" }}>
              <div>
                <div className="eyebrow">当前会话</div>
                <h1>{data.currentThread.name}</h1>
              </div>
              <button className="button">拉黑用户</button>
            </div>
            <p className="section-copy">{data.currentThread.status}</p>
            <div className="hint">{data.currentThread.intro}</div>
          </section>

          <section className="table-card chat-log">
            {data.messages.items.map((message) => (
              <article
                className={`chat-bubble ${message.sender === "me" ? "mine" : "other"}`}
                key={message.id}
              >
                <div className="hint">
                  {message.author} · {message.time}
                </div>
                <p>{message.body}</p>
              </article>
            ))}
          </section>

          <section className="panel">
            {session.restrictionReason ? (
              <div className="notice-inline">
                <strong>当前不能发送私信</strong>
                <p>{session.restrictionReason}</p>
              </div>
            ) : (
              <MessageComposer canMessage={session.canMessage} threadId={data.currentThread.id} />
            )}
          </section>
        </section>
      </div>
    </AppShell>
  );
}
