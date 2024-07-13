// lib/mongodb.js
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI);

  connection.isConnected = db.connections[0].readyState;

  const bucket = new GridFSBucket(db.connections[0].db, {
    bucketName: "uploads",
  });

  db.bucket = bucket;
}

export default dbConnect;
