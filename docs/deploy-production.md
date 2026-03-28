# 烟灰缸上线部署说明（V1）

## 1. 生产部署目标
- 唯一线上应用：`community-app`（Next.js）
- 根目录静态页面仅作历史存档，不再作为主站

## 2. 环境要求
- Node.js 22+
- npm 10+

## 3. 必需环境变量
- `FORUM_DATA_DRIVER=database`
- `FORUM_ADMIN_API_TOKEN=<随机高强度密钥>`
- `NODE_ENV=production`

## 4. 构建与启动
在仓库根目录执行：

```bash
cd community-app
npm ci
npm run db:migrate
npm run db:seed
npm run typecheck
npm run lint
npm run build
npm run start
```

默认服务端口可由平台注入 `PORT`。

## 5. 域名绑定建议
- 主域名绑定到 `community-app` 部署实例
- 若旧静态站仍可访问，保留 301 跳转到新域名

## 6. 回滚策略
- 每次发布前打 Git tag（例如 `release-2026-03-28`）
- 回滚时在平台切回上一个成功构建版本
- 若需要数据回滚：备份并恢复 `community-app/data/forum.sqlite`

## 7. 发布前检查清单
- `npm run typecheck` 通过
- `npm run lint` 通过
- `npm run build` 通过
- 注册/登录/登出可用
- 发帖/评论/私信/举报在未登录状态被拦截
- 管理员接口无 token 时被拒绝
