import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function ReportPage() {
  return (
    <AppShell current="forum">
      <div className="auth-layout">
        <section className="panel form-card">
          <div className="eyebrow">Report</div>
          <h1>Report content</h1>
          <p className="section-copy">
            Reported content is hidden first. Repeated reports can trigger automatic limits before
            a moderator makes the final decision.
          </p>
          <form className="form-grid">
            <div className="field">
              <label htmlFor="target">Target</label>
              <input
                id="target"
                type="text"
                defaultValue="Thread: What matters first when you build a personal project?"
              />
            </div>
            <div className="field">
              <label htmlFor="reason">Reason</label>
              <select id="reason" defaultValue="Causes discomfort">
                <option>Causes discomfort</option>
                <option>Content is inaccurate</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="note">Extra context</label>
              <textarea
                id="note"
                placeholder="Give moderators the smallest amount of context needed to judge this report."
              />
            </div>
            <div className="action-row">
              <Link className="button primary" href="/forum/thread">
                Submit preview
              </Link>
            </div>
          </form>
        </section>

        <aside className="stack">
          <section className="panel">
            <h3>Report behavior</h3>
            <ul className="list">
              <li>Content is hidden first.</li>
              <li>Moderators review it afterward.</li>
              <li>Repeated reports can restrict an account automatically.</li>
            </ul>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}
