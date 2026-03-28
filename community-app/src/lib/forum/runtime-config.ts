export type DataDriver = "file" | "database";

export type RuntimeConfig = {
  dataDriver: DataDriver;
  adminApiToken: string | null;
};

function normalizeDataDriver(input: string | undefined): DataDriver {
  if (!input) {
    return "file";
  }

  if (input === "database") {
    return "database";
  }

  return "file";
}

export function getRuntimeConfig(): RuntimeConfig {
  return {
    dataDriver: normalizeDataDriver(process.env.FORUM_DATA_DRIVER),
    adminApiToken: process.env.FORUM_ADMIN_API_TOKEN?.trim() || null,
  };
}
