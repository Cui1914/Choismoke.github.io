# 论坛本地管理与安全第一版

这一版完成的是“本地可验证链路”，目标不是正式上线，而是把管理动作从页面概念推进到真实数据写入。

## 现在已经能做的事

- 举报会写入 `community-app/data/forum-db.json`
- 举报提交后，目标内容会先被标记为隐藏
- 管理员动作会写入 `moderationActions`
- 支持的本地管理动作：
  - `hide`
  - `restore`
  - `delete`
  - `mute7d`
  - `banPermanent`
- 用户账号会记录：
  - `status`
  - `reportCount`
  - `mutedUntil`
  - `bannedUntil`

## 相关文件

- `community-app/src/lib/forum/types.ts`
- `community-app/src/lib/forum/repository.ts`
- `community-app/src/lib/forum/service.ts`
- `community-app/src/lib/forum/auth-repository.ts`
- `community-app/src/app/api/forum/report/route.ts`
- `community-app/src/app/api/forum/moderation/route.ts`
- `community-app/src/app/forum/admin/page.tsx`
- `community-app/src/app/forum/report/page.tsx`

## 当前边界

- 这还是本地 JSON 存储，不是正式数据库
- 管理动作已经能写入，但还没有完整表单交互
- 用户状态变化已经能落本地，但还没有全站权限拦截

## 下一步建议

1. 让举报页和后台页真正提交到接口
2. 把被隐藏/被删除/被封禁的状态接到前台展示和权限判断
3. 再进入正式数据库阶段
