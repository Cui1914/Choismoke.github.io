import { AppShell } from "@/components/app-shell";
import { InfoCard } from "@/components/forum/info-card";
import { StatsGrid } from "@/components/forum/stats-grid";

export default function AdminPage() {
  return (
    <AppShell current="forum">
      <div className="stack">
        <section className="hero">
          <div className="eyebrow">Admin Preview</div>
          <h1>烟灰缸后台</h1>
          <p className="lead">这里预留用户管理、举报处理、公告发布、分类管理和基础统计。</p>
        </section>

        <StatsGrid
          items={[
            { value: "1,248", label: "累计用户" },
            { value: "386", label: "累计帖子" },
            { value: "27", label: "待处理举报" },
            { value: "5", label: "待审核封禁" },
          ]}
        />

        <section className="helper-grid">
          <InfoCard
            eyebrow="Queue"
            title="处理队列"
            description="举报、删帖、封禁、公告和分类维护会被拆成不同工作区，避免后台入口过深。"
          />
          <InfoCard
            eyebrow="Users"
            title="用户维度"
            description="后续会补封禁历史、被举报次数、最近发言和账号风险标记。"
          />
          <InfoCard
            eyebrow="Signals"
            title="内容信号"
            description="后台会看到最热帖、异常增长帖和高频举报帖，帮助管理员快速判断优先级。"
          />
        </section>

        <section className="table-card">
          <div className="field-row" style={{ justifyContent: "space-between" }}>
            <h2>最新举报</h2>
            <button className="button">发布公告</button>
          </div>
          <div className="table-row">
            <strong>帖子：某条争议内容</strong>
            <span>原因：感到不适</span>
            <span>状态：已隐藏</span>
            <span>操作：处理</span>
          </div>
          <div className="table-row">
            <strong>用户：QuietLoop</strong>
            <span>原因：内容不实</span>
            <span>状态：待确认</span>
            <span>操作：查看</span>
          </div>
          <div className="table-row">
            <strong>评论：某条回复</strong>
            <span>原因：感到不适</span>
            <span>状态：已隐藏</span>
            <span>操作：恢复</span>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
