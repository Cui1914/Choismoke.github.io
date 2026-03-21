import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function HomePage() {
  return (
    <AppShell current="home">
      <section className="hero">
        <div className="eyebrow">Community App</div>
        <h1>烟灰缸前端应用骨架</h1>
        <p className="lead">
          这一部分从静态 HTML 中拆出来，作为后续真实论坛的稳定前端基础。
        </p>
        <div className="action-row">
          <Link className="button primary" href="/forum">
            进入论坛预览
          </Link>
          <Link className="button" href="/forum/compose">
            查看发帖页
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
