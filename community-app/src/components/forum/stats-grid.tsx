type StatsGridProps = {
  items: { value: string; label: string }[];
};

export function StatsGrid({ items }: StatsGridProps) {
  return (
    <section className="stat-grid">
      {items.map((item) => (
        <article className="stat-card" key={`${item.label}-${item.value}`}>
          <span className="stat-value">{item.value}</span>
          {item.label}
        </article>
      ))}
    </section>
  );
}
