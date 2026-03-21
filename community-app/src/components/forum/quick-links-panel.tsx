import Link from "next/link";

type QuickLinksPanelProps = {
  title?: string;
  links: { href: string; label: string }[];
};

export function QuickLinksPanel({
  title = "快捷入口",
  links,
}: QuickLinksPanelProps) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      <div className="action-row">
        {links.map((item) => (
          <Link className="button" href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
