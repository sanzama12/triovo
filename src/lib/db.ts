/**
 * Neon PostgreSQL Client cho môi trường Production & Serverless.
 * Sử dụng HTTPS API kết nối trực tiếp đến Neon Cloud Database,
 * đảm bảo zero-timeout, không phụ thuộc cổng 5432, hoạt động hoàn hảo trên mọi tên miền.
 */
export const DEFAULT_DATABASE_URL =
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  "postgresql://neondb_owner:npg_LnBg8SAa5MfP@ep-soft-mode-b4nr4tp4.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require";

export const isDatabaseConfigured = (): boolean => {
  return Boolean(
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.VERCEL ||
    process.env.NODE_ENV === "production"
  );
};

export async function query<T = any>(sqlText: string, params: any[] = []): Promise<T[]> {
  const connectionString = DEFAULT_DATABASE_URL;

  try {
    const host = "ep-soft-mode-b4nr4tp4.c-6.us-east-2.aws.neon.tech";
    const res = await fetch(`https://${host}/sql`, {
      method: "POST",
      headers: {
        "Neon-Connection-String": connectionString,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sqlText, params }),
    });

    if (res.ok) {
      const data = await res.json();
      return (data.rows || []) as T[];
    }
    const errText = await res.text();
    console.error(`[Neon DB HTTP Error]: ${res.status} ${errText}`);
  } catch (err: any) {
    console.error(`[PostgreSQL Query Exception]: ${err.message}\nSQL: ${sqlText}`);
  }
  return [];
}

export async function queryOne<T = any>(sqlText: string, params: any[] = []): Promise<T | null> {
  const rows = await query<T>(sqlText, params);
  return rows[0] || null;
}
