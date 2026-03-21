import { AppShell } from "@/components/app-shell";

const announcements = [
  {
    title: "Weekly update: newcomer board opens on Monday",
    tags: ["system", "pinned"],
    body:
      "The next content pass will add a space for first posts, short self-introductions, and lighter conversations so the forum feels easier to enter.",
    time: "Today",
  },
  {
    title: "Community reminder on reports and hidden content",
    tags: ["moderation"],
    body:
      "Reported content is hidden first, then reviewed. This is meant to lower escalation speed while keeping moderation decisions visible.",
    time: "Yesterday",
  },
  {
    title: "Search and tag pages are being expanded",
    tags: ["product"],
    body:
      "The next round improves discovery so people can move through topics, tags, and users more naturally instead of relying only on the main feed.",
    time: "2 days ago",
  },
];

export default function AnnouncementsPage() {
  return (
    <AppShell current="forum">
      <div className="stack">
        <section className="hero">
          <div className="eyebrow">Announcements</div>
          <h1>Announcement board</h1>
          <p className="lead">
            This page now reads like a real public notice board: pinned updates, moderation notes,
            and product changes that affect everyone.
          </p>
        </section>

        {announcements.map((item) => (
          <article className="post-card" key={item.title}>
            <div className="field-row" style={{ justifyContent: "space-between" }}>
              <h3>{item.title}</h3>
              <span className="hint">{item.time}</span>
            </div>
            <div className="tag-row">
              {item.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
