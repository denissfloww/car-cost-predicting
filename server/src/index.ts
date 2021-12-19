import app from './app';
import http from 'http';
import { connectDb } from './db-connection';

const PORT = 5000;

connectDb();

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
