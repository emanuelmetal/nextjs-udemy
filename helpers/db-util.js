import { MongoClient } from 'mongodb';

export async function connectToDB() {
  const client = await MongoClient.connect(
    'mongodb+srv://epereyra:qSQHqcLXLUs47Ws@cluster0.a5jod.mongodb.net/events?retryWrites=true&w=majority'
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}
export async function getAllDocuments(client, collection, filter = {}) {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .sort({ _id: -1 })
    .toArray();

  return documents;
}
