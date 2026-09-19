import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/skill_inheritance_ai';
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout to fallback if no Mongo daemon
    });
    isConnected = true;
    console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[Database] MongoDB not reachable at ${uri}. Running in-memory resilient mock store mode. (Zero setup needed!)`);
  }
};

export const getDbStatus = () => ({
  connected: isConnected,
  mode: isConnected ? 'mongodb' : 'in-memory-cache'
});
