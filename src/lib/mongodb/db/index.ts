import mongoose from "mongoose";

const MONGODB_URL = process.env["DATABASE_URL"];

let cached = (global as any).mongoose || {conn: null, promise: null};

export const connToDb = async () => {
  if(cached.conn)
    return cached.conn;

  if(!MONGODB_URL)
    throw new Error("MongoDB URL is required");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "PZ-Shop",
      bufferCommands: false
    });

  cached.conn = await cached.promise;

  return cached.conn;
}