import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "forum.sqlite");

await mkdir(dataDir, { recursive: true });
const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS app_kv (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`);

async function seedFromJson(key, fallback) {
  const select = db.prepare("SELECT key FROM app_kv WHERE key = ?").get(key);
  if (select) {
    return;
  }

  const file = path.join(dataDir, key);
  let payload = fallback;

  try {
    const content = await readFile(file, "utf8");
    payload = JSON.parse(content);
  } catch {
    payload = fallback;
  }

  db.prepare("INSERT INTO app_kv (key, value, updated_at) VALUES (?, ?, ?)").run(
    key,
    JSON.stringify(payload, null, 2),
    new Date().toISOString(),
  );
}

await seedFromJson("auth-db.json", {
  users: [],
  sessions: [],
});

await seedFromJson("forum-db.json", {
  threads: [],
  comments: [],
  messages: [],
  notificationReads: [],
  reports: [],
  moderationActions: [],
});

console.log(`Seed complete: ${dbPath}`);
