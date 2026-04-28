'use strict';
import dotenv from 'dotenv'
import mongoose, { mongo } from 'mongoose';

dotenv.config({ path: '../.env' })

const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME; //change in the .env file if need another one
const MONGODB_URI =
  process.env.MONGO_URI || `mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`;

if (!DB_NAME) {
  throw new Error('missing env variable');
}

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to db: ', MONGODB_URI);
  } catch (error) {
    console.log(`Could not connect: ${error}`);
  }
})();

export default mongoose;
