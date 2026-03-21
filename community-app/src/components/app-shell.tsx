import Link from "next/link";

type AppShellProps = {
  current: "home" | "forum";
  children: React.ReactNode;
};

const navItems = [
  { href: "/", label: "入口", key: "home" },
  { href: "/forum", label: "烟灰缸", key: "forum" },
] as const;

export function AppShell({ current, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link className="brand" href="/">
            Choismoke
          </Link>
          <nav className="nav">
            {navItems.map((item) => (
              <Link
                key={item.href}
                className={`nav-link ${current === item.key ? "active" : ""}`}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}
