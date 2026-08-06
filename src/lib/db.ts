import { MongoClient, type Db } from "mongodb";

// MongoDB connection, cached across serverless invocations. Everything degrades
// to a no-op when MONGODB_URI is absent so the site still builds and runs.
const uri = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB ?? "corebyte";
const TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

// Separate cold-email outreach cluster (read-only). Optional: everything
// degrades to a no-op when EMAIL_DB_URI is absent.
const emailUri = process.env.EMAIL_DB_URI;
const EMAIL_DB_NAME = process.env.EMAIL_DB_NAME ?? "email_sending_agent";

declare global {
  // eslint-disable-next-line no-var
  var _ltMongo: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var _ltEmailMongo: Promise<MongoClient> | undefined;
}

export function dbEnabled() {
  return Boolean(uri);
}

export function emailDbEnabled() {
  return Boolean(emailUri);
}

async function getClient(): Promise<MongoClient | null> {
  if (!uri) return null;
  if (!global._ltMongo) {
    global._ltMongo = new MongoClient(uri).connect();
  }
  return global._ltMongo;
}

let indexesReady = false;

export async function getDb(): Promise<Db | null> {
  const client = await getClient();
  if (!client) return null;
  const db = client.db(DB_NAME);

  if (!indexesReady) {
    try {
      // TTL indexes auto-purge documents 30 days after createdAt
      await db
        .collection("visits")
        .createIndex({ createdAt: 1 }, { expireAfterSeconds: TTL_SECONDS });
      await db
        .collection("messages")
        .createIndex({ createdAt: 1 }, { expireAfterSeconds: TTL_SECONDS });
      await db
        .collection("messages")
        .createIndex({ sessionId: 1, createdAt: 1 });
      await db
        .collection("leads")
        .createIndex({ createdAt: 1 }, { expireAfterSeconds: TTL_SECONDS });
      await db.collection("leads").createIndex({ sessionId: 1 }, { unique: true });
      // sparse: only visits carrying a cold-email token are indexed
      await db.collection("visits").createIndex({ lt: 1 }, { sparse: true });
      indexesReady = true;
    } catch {
      // index creation is best-effort
    }
  }
  return db;
}

async function getEmailClient(): Promise<MongoClient | null> {
  if (!emailUri) return null;
  if (!global._ltEmailMongo) {
    global._ltEmailMongo = new MongoClient(emailUri).connect();
  }
  return global._ltEmailMongo;
}

// Read-only handle on the cold-email outreach DB. Returns null when unset.
export async function getEmailDb(): Promise<Db | null> {
  const client = await getEmailClient();
  if (!client) return null;
  return client.db(EMAIL_DB_NAME);
}
