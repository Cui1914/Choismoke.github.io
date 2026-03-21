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
            标题最长 17 字，正文最长 300 字，支持图片、视频、代码块、标签和投票。
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
            <div className="field">
              <label htmlFor="addons">图片 / 视频 / 代码块 / 投票</label>
              <input id="addons" type="text" placeholder="后续会接入真实上传和编辑器能力" />
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
            title="内容规则"
            description="单帖最多 10 张图片、5 个标签、7 个投票选项。评论最长 50 字，私信最长 200 字。"
          />
          <InfoCard
            eyebrow="编辑器"
            title="支持能力"
            description="后续会补富文本、代码块插入、媒体上传入口和更完整的投票配置。"
          />
          <InfoCard
            eyebrow="审核"
            title="发布规则"
            description="被举报的内容会先隐藏。累计被举报达到阈值后，会触发自动限制并进入管理员处理流程。"
          />
        </section>
      </div>
    </AppShell>
  );
}
