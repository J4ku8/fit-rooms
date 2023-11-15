import app from "../app";
import config from "../config/config";
import logger from "../midleware/logger";

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // default MongoDB connection URL

const dbName = 'fit-rooms';

async function connector() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const adminDb = client.db('admin');
        const databaseList = await adminDb.admin().listDatabases();
        const doesDatabaseExist = databaseList.databases.some((db: { name: string; }) => db.name === dbName);
        if (!doesDatabaseExist) {
            console.log(`Creating '${dbName}' database`);
            await adminDb.admin().command({ create: dbName });
        }
        const db = client.db(dbName);
        const collectionName = 'sampleCollection';
        const sampleCollection = db.collection(collectionName);
        await sampleCollection.insertOne({});

        console.log(`Connected to '${dbName}' database`);
        return db;
    } catch (error) {
        console.error('Error connecting to the database', error);
        throw error;
    }
}

export const connect = () =>
    connector().then((database) => {
        const server = app.listen(parseInt(config.port), () => {
            logger.log('info', `Server is running on Port: ${config.port}`);
        });
        process.on('SIGTERM', () => {
            logger.info('SIGTERM signal received.');
            logger.info('Closing http server.');
            server.close((err) => {
                logger.info('Http server closed.');
                process.exit(err ? 1 : 0);
            });
        });
        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    });

export default connect
