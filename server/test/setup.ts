import dotenv from "dotenv";
import mongoose from "mongoose";
import { beforeAll, afterAll, beforeEach } from "vitest";
dotenv.config({ path: "../../.env.test" });

const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME; //change in the .env file if need another one
const MONGODB_URI =
  process.env.MONGO_URI || `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`;

if (!MONGODB_URI) {
  throw new Error("MONGO_URI is not defined in .env.test");
}

beforeAll(async () => {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(MONGODB_URI);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

beforeEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});