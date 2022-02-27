import path from 'path';
import dotenvSafe from 'dotenv-safe';

const cwd = process.cwd();
const root = path.join.bind(cwd);

dotenvSafe.config({
    path: root('.env'),
    sample: root('.env.example'),
});

const ENV = process.env;

const config = {
    JWT_SECRET: ENV.JWT_KEY || 'secret_key',
    MONGO_CONNECTION_URL: ENV.MONGO_CONNECTION_URL || 'mongodb://root:root@localhost:27017',
    PORT: Number(ENV.PORT) || 3333,
};

export default config;
