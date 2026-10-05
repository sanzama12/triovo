import { MongoClient, Db } from "mongodb";

/**
 * Quản lý kết nối MongoDB tối ưu cho môi trường Serverless (Vercel) & Next.js Hot Reload.
 * Sử dụng connection caching trên globalThis để tránh cạn kiệt pool kết nối.
 */

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB || "trovio";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | null = null;

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim().length > 0);
}

export async function getMongoClient(): Promise<MongoClient> {
  const currentUri = process.env.MONGODB_URI;
  if (!currentUri) {
    throw new Error(
      "Biến môi trường MONGODB_URI chưa được thiết lập. Hãy thêm MONGODB_URI vào .env.local hoặc cấu hình Environment Variables trên Vercel."
    );
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(currentUri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 8000,
      });
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    const client = new MongoClient(currentUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 8000,
    });
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const client = await getMongoClient();
  const currentDbName = process.env.MONGODB_DB || dbName;
  return client.db(currentDbName);
}
