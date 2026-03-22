import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { SettingsSection } from "@/components/forum/settings-section";

export default function SettingsPage() {
  return (
    <AppShell current="forum">
      <div className="stack form-card">
        <section className="panel">
          <div className="eyebrow">设置</div>
          <h1>账号与个人资料设置</h1>
          <p className="section-copy">
            这一页现在已经按真实账号系统会用到的结构整理好：账号信息、资料展示、可见性和私信规则都分开处理。
          </p>
        </section>

        <div className="settings-grid">
          <SettingsSection title="基础资料">
            <div className="field">
              <label htmlFor="username">用户名</label>
              <input id="username" type="text" defaultValue="Choismoke" />
              <div className="hint">当前已使用 3 次改名机会，剩余 7 次。</div>
            </div>
            <div className="field">
              <label htmlFor="bio">个人简介</label>
              <textarea id="bio" defaultValue="记录项目、生活、游戏和思考。" />
            </div>
          </SettingsSection>

          <SettingsSection title="可见性">
            <div className="field">
              <label htmlFor="following-visibility">关注列表</label>
              <select id="following-visibility" defaultValue="公开">
                <option>公开</option>
                <option>隐藏</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="followers-visibility">粉丝列表</label>
              <select id="followers-visibility" defaultValue="公开">
                <option>公开</option>
                <option>隐藏</option>
              </select>
            </div>
          </SettingsSection>

          <SettingsSection title="私信规则">
            <div className="field">
              <label htmlFor="dm">陌生人私信</label>
              <select id="dm" defaultValue="互关前允许 1 条">
                <option>互关前允许 1 条</option>
                <option>仅好友可私信</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="blocked">已拉黑用户</label>
              <input id="blocked" type="text" placeholder="当前预览没有拉黑记录" />
            </div>
          </SettingsSection>

          <SettingsSection title="公开链接">
            <div className="field">
              <label htmlFor="github">GitHub</label>
              <input id="github" type="text" defaultValue="github.com/Cui1914" />
            </div>
            <div className="field">
              <label htmlFor="bilibili">Bilibili</label>
              <input id="bilibili" type="text" defaultValue="space.bilibili.com/353704869" />
            </div>
            <div className="field">
              <label htmlFor="email">公开邮箱</label>
              <input id="email" type="email" defaultValue="cui11914@gmail.com" />
            </div>
          </SettingsSection>
        </div>

        <div className="action-row">
          <Link className="button primary" href="/forum/profile">
            保存预览
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
