import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

export = async function globalSetup() {
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGO_CONNECTION_URL = uri.slice(0, uri.lastIndexOf('/'));

    // The following is to make sure the database is clean before an test starts
    await mongoose.connect(process.env.MONGO_CONNECTION_URL);
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
};
