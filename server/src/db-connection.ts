import 'reflect-metadata';
import { createConnection } from 'typeorm';

export const connectDb = async () => {
    try {
        await createConnection();
        console.log('Db connected');
    } catch (err) {
        console.log(err);
    }
};
