import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function HomePage() {
  return (
    <AppShell current="home">
      <section className="hero">
        <div className="eyebrow">社区前端应用</div>
        <h1>烟灰缸论坛前端骨架</h1>
        <p className="lead">
          这一部分已经从静态页面中拆出来，作为后续真正可用论坛的稳定前端基础。
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
