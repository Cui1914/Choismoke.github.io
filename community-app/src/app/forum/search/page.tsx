import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { StatsGrid } from "@/components/forum/stats-grid";
import { getSearchResults } from "@/lib/forum/service";

export default async function SearchPage() {
  const data = await getSearchResults();

  return (
    <AppShell current="forum">
      <div className="stack">
        <section className="hero">
          <div className="eyebrow">搜索</div>
          <h1>“{data.query}” 的搜索结果</h1>
          <p className="lead">
            搜索会覆盖帖子标题、正文、标签和用户名，让论坛不只是靠浏览，也能靠检索找到内容。
          </p>
        </section>

        <StatsGrid items={data.tabs} />

        <div className="layout-grid">
          <section className="stack">
            <div className="toolbar">
              <label className="search">
                <span>关键词</span>
                <input defaultValue={data.query} />
              </label>
              <div className="field-row">
                <span className="tag">最佳匹配</span>
                <span className="tag">最新</span>
                <span className="tag">最高赞</span>
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
              <h3>相关用户</h3>
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
