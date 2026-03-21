import Link from "next/link";
import { AppShell } from "@/components/app-shell";

const categoryThreads = [
  {
    title: "How should a personal project be presented for long-term visibility?",
    tags: ["Tech", "Pinned", "Featured"],
    meta: ["by ArchiveField", "Published yesterday", "Last reply 1 hour ago", "58 likes", "21 replies", "312 views"],
  },
  {
    title: "What matters first when you build a personal project?",
    tags: ["Tech", "Discussion"],
    meta: ["by AshDrop", "Published today", "Last reply 18 minutes ago", "41 likes", "18 replies", "238 views"],
  },
  {
    title: "Which interface details most improve the sense of completion?",
    tags: ["Tech", "Design"],
    meta: ["by MonoNight", "Published 2 days ago", "Last reply today", "27 likes", "11 replies", "184 views"],
  },
];

export default function CategoryPage() {
  return (
    <AppShell current="forum">
      <div className="stack">
        <section className="hero">
          <div className="eyebrow">Category</div>
          <h1>Tech</h1>
          <p className="lead">
            A category page should feel denser than the homepage: more list detail, stronger sorting
            language, and clearer thread signals.
          </p>
        </section>

        <div className="toolbar">
          <div className="field-row">
            <span className="tag">Mixed</span>
            <span className="tag">Latest</span>
            <span className="tag">Hottest</span>
          </div>
          <div className="hint">124 threads in this category</div>
        </div>

        {categoryThreads.map((thread) => (
          <article className="post-card" key={thread.title}>
            <div className="field-row">
              <h3>
                <Link href="/forum/thread">{thread.title}</Link>
              </h3>
            </div>
            <div className="tag-row">
              {thread.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="meta-row">
              {thread.meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
