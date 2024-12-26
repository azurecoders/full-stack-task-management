import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI = process.env.MONGO_URI!;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "task_management",
      connectTimeoutMS: 30000, // 30 seconds,
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
