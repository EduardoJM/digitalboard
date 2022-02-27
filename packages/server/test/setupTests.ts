import mongoose from 'mongoose';

beforeAll(async () => {
    if (!process.env.MONGO_CONNECTION_URL) {
        return;
    }
    await mongoose.connect(process.env.MONGO_CONNECTION_URL);
});

afterAll(async () => {
    await mongoose.disconnect();
});
