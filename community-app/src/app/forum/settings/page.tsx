import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { SettingsSection } from "@/components/forum/settings-section";

export default function SettingsPage() {
  return (
    <AppShell current="forum">
      <div className="stack form-card">
        <section className="panel">
          <div className="eyebrow">Settings</div>
          <h1>Profile and account settings</h1>
          <p className="section-copy">
            This page now behaves more like a real account center: profile details, visibility,
            messaging rules, and public links are grouped by purpose.
          </p>
        </section>

        <div className="settings-grid">
          <SettingsSection title="Basic profile">
            <div className="field">
              <label htmlFor="username">Username</label>
              <input id="username" type="text" defaultValue="SmokeSignal" />
              <div className="hint">2-10 characters. 7 of 10 rename chances remaining.</div>
            </div>
            <div className="field">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                defaultValue="Tracks project work, game feel, and daily rhythm."
              />
            </div>
          </SettingsSection>

          <SettingsSection title="Visibility">
            <div className="field">
              <label htmlFor="following-visibility">Following list</label>
              <select id="following-visibility" defaultValue="Visible">
                <option>Visible</option>
                <option>Hidden</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="followers-visibility">Followers list</label>
              <select id="followers-visibility" defaultValue="Visible">
                <option>Visible</option>
                <option>Hidden</option>
              </select>
            </div>
          </SettingsSection>

          <SettingsSection title="Messages">
            <div className="field">
              <label htmlFor="dm">Direct messages from strangers</label>
              <select id="dm" defaultValue="Allow 1 message before mutual follow">
                <option>Allow 1 message before mutual follow</option>
                <option>Friends only</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="blocked">Blocked users</label>
              <input id="blocked" type="text" placeholder="No blocked users in this preview" />
            </div>
          </SettingsSection>

          <SettingsSection title="Public links">
            <div className="field">
              <label htmlFor="github">GitHub</label>
              <input id="github" type="text" defaultValue="github.com/Cui1914" />
            </div>
            <div className="field">
              <label htmlFor="bilibili">Bilibili</label>
              <input
                id="bilibili"
                type="text"
                defaultValue="space.bilibili.com/353704869"
              />
            </div>
            <div className="field">
              <label htmlFor="email">Public email</label>
              <input id="email" type="email" defaultValue="cui11914@gmail.com" />
            </div>
          </SettingsSection>
        </div>

        <div className="action-row">
          <Link className="button primary" href="/forum/profile">
            Save preview
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
