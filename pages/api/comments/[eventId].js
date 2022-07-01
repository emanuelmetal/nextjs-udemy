import { MongoClient } from 'mongodb';
import {
  getAllDocuments,
  connectToDB,
  insertDocument
} from '../../../helpers/db-util';

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectToDB();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  // const db = client.db();
  // await db.collection('emails').insertOne({ email: userEmail });

  if (req.method === 'POST') {
    const { email, name, text } = req.body;
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }
    const newComment = {
      email,
      name,
      text,
      eventId
    };

    try {
      const result = await insertDocument(client, 'comments', newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: 'Added comment', comment: newComment });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting to the database failed!' });
      client.close();
      return;
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(client, 'comments', {
        eventId: eventId
      });

      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
      return;
    }
  }
  client.close();
}
