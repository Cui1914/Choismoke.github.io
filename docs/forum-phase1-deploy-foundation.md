# 论坛上线第一步（已落地）

这一轮不是 UI 迭代，而是上线基础护栏：

## 1. 管理员接口鉴权

以下接口已经加了管理员校验：

- `/api/forum/moderation`
- `/api/forum/user-status`

校验方式：

- 请求头必须带 `x-admin-token`
- 服务端环境变量 `FORUM_ADMIN_API_TOKEN` 必须配置

说明：

- 非生产环境下，如果没配 token，会放行，方便本地开发
- 生产环境下不配 token 会直接拒绝请求

## 2. 登录会话 Cookie

认证接口现在会操作 HttpOnly Cookie：

- 登录成功：写入 `forum_session`
- 注册成功：写入 `forum_session`
- 退出登录：清除 `forum_session`
- 查询会话：先检查 `forum_session`，没有则返回未登录

## 3. 数据驱动开关

新增运行时配置：

- `FORUM_DATA_DRIVER=file|database`

当前行为：

- `file`：继续使用本地 JSON（默认）
- `database`：会阻止本地 JSON 读写，避免误把生产模式落到文件存储

## 上线前你需要配置的环境变量

- `FORUM_ADMIN_API_TOKEN`：管理员接口令牌（生产必配）
- `FORUM_DATA_DRIVER`：建议生产配置为 `database`

## 下一步建议

1. 补真实数据库实现（替换 `storage.ts` 文件模式）
2. 增加密码哈希与真实用户表
3. 把管理员权限从“令牌”升级到“角色权限模型”
