import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

// Cache the client across hot reloads in dev and across invocations in prod
// so we don't open a new connection pool on every request.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it to .env.local");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri, {
      serverSelectionTimeoutMS: 8000,
    }).connect();
  }
  return globalForMongo._mongoClientPromise;
}

/** Database named in the connection string ("career-garage"). */
export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db();
}
