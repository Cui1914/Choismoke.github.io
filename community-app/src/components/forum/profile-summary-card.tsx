import Link from "next/link";

type ProfileSummaryCardProps = {
  name: string;
  description: string;
  metaItems: string[];
  tags: string[];
};

export function ProfileSummaryCard({
  name,
  description,
  metaItems,
  tags,
}: ProfileSummaryCardProps) {
  return (
    <section className="panel">
      <div className="eyebrow">个人资料</div>
      <h1>{name}</h1>
      <p className="section-copy">{description}</p>
      <div className="meta-row">
        {metaItems.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <div className="tag-row">
        {tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <div className="action-row">
        <a className="button" href="#">
          关注
        </a>
        <Link className="button" href="/forum/messages">
          私信
        </Link>
        <Link className="button" href="/forum/settings">
          设置
        </Link>
      </div>
    </section>
  );
}
