import { MongoClient, Db, Collection } from 'mongodb';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');
  } catch (error) {
    console.error('✗ Failed to connect to MongoDB:', error);
    throw error;
  }

  const db = client.db(process.env.DATABASE_NAME);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function getCollection<T>(
  collectionName: string
): Promise<Collection<any>> {
  const { db } = await connectToDatabase();
  return db.collection<any>(collectionName);
}
