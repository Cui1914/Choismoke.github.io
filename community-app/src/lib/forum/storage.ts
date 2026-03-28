import { mkdir, readFile, writeFile } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { getRuntimeConfig } from "./runtime-config";

const dataDir = path.join(process.cwd(), "data");
const sqliteFile = path.join(dataDir, "forum.sqlite");
let sqliteDb: DatabaseSync | null = null;

async function ensureDataDir() {
  await mkdir(dataDir, { recursive: true });
}

function getSqliteDb() {
  if (!sqliteDb) {
    sqliteDb = new DatabaseSync(sqliteFile);
    sqliteDb.exec(
      "CREATE TABLE IF NOT EXISTS app_kv (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL)",
    );
  }

  return sqliteDb;
}

async function readJsonFromSqlite<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const db = getSqliteDb();
  const row = db.prepare("SELECT value FROM app_kv WHERE key = ?").get(filename) as
    | { value: string }
    | undefined;

  if (!row) {
    await writeJsonToSqlite(filename, fallback);
    return fallback;
  }

  return JSON.parse(row.value) as T;
}

async function writeJsonToSqlite<T>(filename: string, value: T): Promise<void> {
  await ensureDataDir();
  const db = getSqliteDb();
  db.prepare(
    "INSERT INTO app_kv (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at",
  ).run(filename, JSON.stringify(value, null, 2), new Date().toISOString());
}

async function readJsonFromFile<T>(filename: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filepath = path.join(dataDir, filename);

  try {
    const content = await readFile(filepath, "utf8");
    return JSON.parse(content) as T;
  } catch {
    await writeJsonToFile(filename, fallback);
    return fallback;
  }
}

async function writeJsonToFile<T>(filename: string, value: T): Promise<void> {
  await ensureDataDir();
  const filepath = path.join(dataDir, filename);
  await writeFile(filepath, JSON.stringify(value, null, 2), "utf8");
}

export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  const { dataDriver } = getRuntimeConfig();
  if (dataDriver === "database") {
    return readJsonFromSqlite(filename, fallback);
  }

  return readJsonFromFile(filename, fallback);
}

export async function writeJsonFile<T>(filename: string, value: T): Promise<void> {
  const { dataDriver } = getRuntimeConfig();
  if (dataDriver === "database") {
    await writeJsonToSqlite(filename, value);
    return;
  }

  await writeJsonToFile(filename, value);
}
