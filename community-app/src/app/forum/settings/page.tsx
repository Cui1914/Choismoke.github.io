import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { SettingsSection } from "@/components/forum/settings-section";
import { getAuthSession } from "@/lib/forum/auth-service";

export default async function SettingsPage() {
  const session = await getAuthSession();
  const user = session.user;

  return (
    <AppShell current="forum">
      <div className="stack form-card">
        <section className="panel">
          <div className="eyebrow">设置</div>
          <h1>账号与个人资料设置</h1>
          <p className="section-copy">
            这一页已经开始从本地账号数据读取。后续接入正式数据库时，结构不会再变，只需要替换保存位置。
          </p>
        </section>

        <div className="settings-grid">
          <SettingsSection title="基础资料">
            <div className="field">
              <label htmlFor="username">用户名</label>
              <input id="username" type="text" defaultValue={user?.username ?? ""} />
              <div className="hint">
                当前已使用 {user?.usernameChangesUsed ?? 0} 次改名机会，剩余{" "}
                {(user?.usernameChangesLimit ?? 0) - (user?.usernameChangesUsed ?? 0)} 次。
              </div>
            </div>
            <div className="field">
              <label htmlFor="bio">个人简介</label>
              <textarea id="bio" defaultValue={user?.bio ?? ""} />
            </div>
          </SettingsSection>

          <SettingsSection title="可见性">
            <div className="field">
              <label htmlFor="following-visibility">关注列表</label>
              <select id="following-visibility" defaultValue={user?.followingVisibility ?? "公开"}>
                <option>公开</option>
                <option>隐藏</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="followers-visibility">粉丝列表</label>
              <select id="followers-visibility" defaultValue={user?.followersVisibility ?? "公开"}>
                <option>公开</option>
                <option>隐藏</option>
              </select>
            </div>
          </SettingsSection>

          <SettingsSection title="私信规则">
            <div className="field">
              <label htmlFor="dm">陌生人私信</label>
              <select id="dm" defaultValue={user?.dmPolicy ?? "互关前允许 1 条"}>
                <option>互关前允许 1 条</option>
                <option>仅好友可私信</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="blocked">已拉黑用户</label>
              <input
                id="blocked"
                type="text"
                defaultValue={user?.blockedUsers?.join("，") ?? ""}
                placeholder="当前没有拉黑记录"
              />
            </div>
          </SettingsSection>

          <SettingsSection title="公开链接">
            <div className="field">
              <label htmlFor="github">GitHub</label>
              <input id="github" type="text" defaultValue={user?.githubUrl ?? ""} />
            </div>
            <div className="field">
              <label htmlFor="bilibili">Bilibili</label>
              <input id="bilibili" type="text" defaultValue={user?.bilibiliUrl ?? ""} />
            </div>
            <div className="field">
              <label htmlFor="email">公开邮箱</label>
              <input id="email" type="email" defaultValue={user?.publicEmail ?? user?.email ?? ""} />
            </div>
            <div className="hint">后续接口：`/api/auth/settings`</div>
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
