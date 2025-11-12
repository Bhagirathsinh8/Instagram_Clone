import mongoose from 'mongoose';
import { db} from '../utils/constant.js';

const ConnectDB = async () => {
  try {
    const DB = await mongoose.connect(db.MONGO_DB_URL);
    console.log(`MongoDB connected: ${DB.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // process.exit(1); // Exit process with failure
  }
}

export default ConnectDB