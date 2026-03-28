import { AppShell } from "@/components/app-shell";
import { ComposeForm } from "@/components/forum/compose-form";
import { InfoCard } from "@/components/forum/info-card";
import { getAuthSession } from "@/lib/forum/auth-service";

export default async function ComposePage() {
  const session = await getAuthSession();

  return (
    <AppShell current="forum">
      <div className="stack">
        <section className="panel form-card">
          <div className="eyebrow">发帖</div>
          <h1>发布新帖子</h1>
          <p className="section-copy">这一页已接到本地账号权限判断，并接通真实发帖提交接口。</p>

          {session.restrictionReason ? (
            <div className="notice-inline">
              <strong>当前不能发帖</strong>
              <p>{session.restrictionReason}</p>
            </div>
          ) : null}

          <ComposeForm canPost={session.canPost} />
        </section>

        <section className="helper-grid">
          <InfoCard
            eyebrow="限制"
            title="发帖规则"
            description="单帖最多 10 张图片、5 个标签、7 个投票选项。禁言与封禁状态会直接阻止发帖。"
          />
          <InfoCard
            eyebrow="内容"
            title="发布后的去向"
            description="发帖成功后，内容会进入首页帖子流、分类页和用户个人主页的最近发帖区域。"
          />
          <InfoCard
            eyebrow="下一步"
            title="当前进展"
            description="页面已提交到接口，后面继续把媒体上传和投票也接成同样的真实提交即可。"
          />
        </section>
      </div>
    </AppShell>
  );
}
