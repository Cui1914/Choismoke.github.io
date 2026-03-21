type ActivityFeedProps = {
  title: string;
  items: { time: string; text: string }[];
};

export function ActivityFeed({ title, items }: ActivityFeedProps) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {items.map((item) => (
        <div className="comment" key={`${item.time}-${item.text}`}>
          <strong>{item.time}</strong>
          <p>{item.text}</p>
        </div>
      ))}
    </section>
  );
}
