import * as dotenv from 'dotenv';

const envFound = dotenv.config();

if (!envFound){
    throw new Error ('env file is not found');
}

export default {
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA
    },
    keys: {
        apiKey: process.env.API_KEY,
        domain: process.env.DOMAIN,
        admin: process.env.ADMIN_EMAIL,
        stripe: process.env.STRIPE,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expires: process.env.JWT_EXPIRES
    }
};