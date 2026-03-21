type InfoCardProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function InfoCard({ eyebrow, title, description }: InfoCardProps) {
  return (
    <article className="helper-card">
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
