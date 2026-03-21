type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  metaItems?: string[];
  actions?: React.ReactNode;
  variant?: "hero" | "panel";
};

export function PageIntro({
  eyebrow,
  title,
  description,
  metaItems,
  actions,
  variant = "hero",
}: PageIntroProps) {
  const className = variant === "hero" ? "hero" : "announcement";

  return (
    <section className={className}>
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      <p className="section-copy">{description}</p>
      {metaItems && metaItems.length > 0 ? (
        <div className="meta-row">
          {metaItems.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}
      {actions ? <div className="action-row">{actions}</div> : null}
    </section>
  );
}
