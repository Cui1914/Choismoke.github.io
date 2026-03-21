import Link from "next/link";

type SidebarListPanelProps = {
  title: string;
  items: { label: string; href?: string }[];
};

export function SidebarListPanel({ title, items }: SidebarListPanelProps) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      <ul className="list">
        {items.map((item) => (
          <li key={item.label}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
