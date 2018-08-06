import * as dotenv from "dotenv";

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
    case "test":
        path = __dirname + '/../.env.test';
        break;
    case "production":
        path = __dirname + '/../.env.production';
        break;
    default:
        path = __dirname + '/../.env.development';
}
dotenv.config({ path: path });

export const APP_PORT = parseInt(process.env.APP_PORT) || 3000;
export const APP_HOST = process.env.APP_HOST || 'localhost';

export const DB_PORT = parseInt(process.env.DB_PORT) || 27017;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_NAME = process.env.DB_NAME || 'mongodb';

