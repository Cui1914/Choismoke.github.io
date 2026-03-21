import Link from "next/link";
import type { ForumThreadSummary } from "@/lib/forum/types";

type ForumThreadCardProps = {
  thread: ForumThreadSummary;
};

export function ForumThreadCard({ thread }: ForumThreadCardProps) {
  return (
    <article className="post-card">
      <div className="field-row" style={{ justifyContent: "space-between" }}>
        <h3>
          <Link href="/forum/thread">{thread.title}</Link>
        </h3>
        {thread.visibility ? <span className="tag">{thread.visibility}</span> : null}
      </div>
      <div className="tag-row">
        {thread.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <p>{thread.excerpt}</p>
      <div className="meta-row">
        <span>作者：{thread.author}</span>
        <span>浏览 {thread.views}</span>
        <span>点赞 {thread.likes}</span>
        <span>回复 {thread.comments}</span>
        <span>收藏 {thread.favorites}</span>
        <span>{thread.publishedAtLabel}</span>
      </div>
    </article>
  );
}
