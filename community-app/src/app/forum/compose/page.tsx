import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { InfoCard } from "@/components/forum/info-card";

export default function ComposePage() {
  return (
    <AppShell current="forum">
      <div className="stack">
        <section className="panel form-card">
          <div className="eyebrow">发帖</div>
          <h1>发布新帖子</h1>
          <p className="section-copy">
            这一页已经为真实发帖接口预留好了结构。后续接入真实内容系统后，这里会直接把标题、正文、分类和标签提交到论坛。
          </p>
          <form className="form-grid">
            <div className="field">
              <label htmlFor="title">标题</label>
              <input id="title" type="text" placeholder="输入标题（17 字以内）" />
            </div>
            <div className="field">
              <label htmlFor="category">分类</label>
              <select id="category">
                <option>技术</option>
                <option>生活</option>
                <option>游戏</option>
                <option>随便聊</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="body">正文</label>
              <textarea id="body" placeholder="输入正文（300 字以内）" />
            </div>
            <div className="field">
              <label htmlFor="tags">标签</label>
              <input id="tags" type="text" placeholder="最多 5 个，自由创建" />
            </div>
            <div className="field-row" style={{ justifyContent: "space-between" }}>
              <span className="hint">后续接口：`/api/forum/threads`</span>
              <span className="hint">发布后会进入真实帖子流</span>
            </div>
            <div className="action-row">
              <Link className="button primary" href="/forum/thread">
                预览帖子
              </Link>
            </div>
          </form>
        </section>

        <section className="helper-grid">
          <InfoCard
            eyebrow="限制"
            title="发帖规则"
            description="单帖最多 10 张图片、5 个标签、7 个投票选项。真实发帖接入后，这些规则会直接在接口层生效。"
          />
          <InfoCard
            eyebrow="内容"
            title="发布后的去向"
            description="发帖成功后，内容会进入首页帖子流、分类页和用户个人主页的最近发帖区域。"
          />
          <InfoCard
            eyebrow="下一步"
            title="还差什么"
            description="后面只需要把当前占位接口接到真实内容存储，发帖就会从预览变成真的发出去。"
          />
        </section>
      </div>
    </AppShell>
  );
}
