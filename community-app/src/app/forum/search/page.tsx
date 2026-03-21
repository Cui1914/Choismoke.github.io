import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { StatsGrid } from "@/components/forum/stats-grid";
import { searchMock } from "@/lib/forum/mock-data";

export default function SearchPage() {
  const data = searchMock;

  return (
    <AppShell current="forum">
      <div className="stack">
        <section className="hero">
          <div className="eyebrow">Search</div>
          <h1>Results for “{data.query}”</h1>
          <p className="lead">
            Search covers thread titles, body text, tags, and usernames. This view makes the forum
            feel searchable instead of just browseable.
          </p>
        </section>

        <StatsGrid items={data.tabs} />

        <div className="layout-grid">
          <section className="stack">
            <div className="toolbar">
              <label className="search">
                <span>Query</span>
                <input defaultValue={data.query} />
              </label>
              <div className="field-row">
                <span className="tag">Best match</span>
                <span className="tag">Latest</span>
                <span className="tag">Most liked</span>
              </div>
            </div>

            {data.results.items.map((result) => (
              <article className="result-card" key={result.id}>
                <h3>
                  <Link href="/forum/thread">{result.title}</Link>
                </h3>
                <p>{result.excerpt}</p>
                <div className="meta-row">
                  {result.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="tag-row">
                  {result.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <aside className="stack">
            <section className="panel">
              <h3>Suggested users</h3>
              <ul className="list">
                {data.featuredUsers.map((user) => (
                  <li key={user.label}>
                    <Link href={user.href ?? "/forum/profile"}>{user.label}</Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
