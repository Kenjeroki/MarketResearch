import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let db;

export async function connectToDB() {
  await client.connect();
  db = client.db(process.env.DB_NAME || "prodexplorer");
  console.log("MongoDB connected");
}

export function getDB() {
  return db;
}

