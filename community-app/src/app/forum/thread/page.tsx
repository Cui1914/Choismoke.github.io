import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { InfoCard } from "@/components/forum/info-card";
import { StatsGrid } from "@/components/forum/stats-grid";
import { ThreadCommentForm } from "@/components/forum/thread-comment-form";
import { getAuthSession } from "@/lib/forum/auth-service";
import { getThreadDetail } from "@/lib/forum/service";

export default async function ThreadPage() {
  const [thread, session] = await Promise.all([getThreadDetail(), getAuthSession()]);
  const threadUnavailable = thread.availability?.status && thread.availability.status !== "visible";

  return (
    <AppShell current="forum">
      <div className="layout-grid">
        <section className="stack">
          <article className="panel">
            <div className="eyebrow">帖子讨论</div>
            <h1>{thread.title}</h1>
            <div className="meta-row">
              <span>作者：{thread.author}</span>
              <span>发布于：{thread.publishedAt}</span>
              <span>编辑于：{thread.editedAt}</span>
            </div>
            <div className="tag-row">
              {thread.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            {threadUnavailable ? (
              <div className="notice-inline" style={{ marginTop: 18 }}>
                <strong>{thread.availability?.status === "deleted" ? "帖子已删除" : "帖子已隐藏"}</strong>
                <p>{thread.availability?.message}</p>
              </div>
            ) : (
              <>
                <div className="split-grid" style={{ marginTop: 18 }}>
                  <div className="stack">
                    {thread.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  <div className="media-frame">
                    <div className="media-stack">
                      <strong>媒体预览区</strong>
                      <span>帖子中的图片和上传视频会显示在这里。</span>
                      <div className="media-strip">
                        <span className="tag">3 张图片</span>
                        <span className="tag">1 段视频</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="action-row">
                  {thread.actions.map((action) => (
                    <a className="button" href="#" key={action.label}>
                      {action.label} {action.value}
                    </a>
                  ))}
                  <Link className="button" href="/forum/report">
                    举报
                  </Link>
                </div>
              </>
            )}
          </article>

          <StatsGrid items={thread.stats} />

          {!threadUnavailable ? (
            <>
              <section className="poll-card">
                <div className="eyebrow">投票</div>
                <h2>{thread.poll.question}</h2>
                <p className="section-copy">当前已有 {thread.poll.totalVotes} 人参与投票。</p>
                <div className="poll-options">
                  {thread.poll.options.map((option) => (
                    <div className="poll-row" key={option.id}>
                      <div className="field-row" style={{ justifyContent: "space-between" }}>
                        <span>{option.label}</span>
                        <span>
                          {option.percent}% · {option.votes} 票
                        </span>
                      </div>
                      <div className="poll-track">
                        <div className="poll-fill" style={{ width: `${option.percent}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="table-card">
                <div className="field-row" style={{ justifyContent: "space-between" }}>
                  <h2>回复 {thread.comments.items.length}</h2>
                  <Link className="button" href="/forum/login">
                    登录后回复
                  </Link>
                </div>
                {thread.comments.items.map((comment) => (
                  <div className="comment" key={comment.id}>
                    <div className="field-row" style={{ justifyContent: "space-between" }}>
                      <strong>{comment.author}</strong>
                      <span className="hint">
                        {comment.time}
                        {comment.edited ? " · 已编辑" : ""}
                      </span>
                    </div>
                    <p>{comment.body}</p>
                    <div className="meta-row">
                      <span>点赞 {comment.likes}</span>
                      <span>回复</span>
                      <span>举报</span>
                    </div>
                  </div>
                ))}
                {session.restrictionReason ? (
                  <div className="notice-inline" style={{ marginTop: 16 }}>
                    <strong>当前不能评论</strong>
                    <p>{session.restrictionReason}</p>
                  </div>
                ) : (
                  <ThreadCommentForm canComment={session.canPost} threadId={thread.id} />
                )}
              </section>
            </>
          ) : null}
        </section>

        <aside className="stack">
          <section className="panel">
            <h3>作者概览</h3>
            <p>{thread.authorSummary.name}</p>
            <div className="hint">{thread.authorSummary.joinedLabel}</div>
            <div className="tag-row" style={{ marginTop: 12 }}>
              {thread.authorSummary.stats.map((item) => (
                <span className="tag" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <div className="action-row">
              <Link className="button" href="/forum/profile">
                查看主页
              </Link>
              <Link className={`button ${!session.canMessage ? "disabled-link" : ""}`} href="/forum/messages">
                发送私信
              </Link>
            </div>
          </section>

          <InfoCard
            eyebrow="评论接口"
            title="回复已接入提交"
            description="评论框现在会真实提交到 /api/forum/comments 并刷新当前页。"
          />
        </aside>
      </div>
    </AppShell>
  );
}
