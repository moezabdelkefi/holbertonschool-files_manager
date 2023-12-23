const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;

    this.client = new MongoClient(`mongodb://${host}:${port}`, { useUnifiedTopology: true });
    this.db = null;

    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db();

      console.log('Connection to MongoDB successful');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  getCollection(collectionName) {
    if (!this.db) {
      throw new Error('Database connection not established');
    }
    return this.db.collection(collectionName);
  }

  isAlive() {
    return this.db !== null;
  }

  async nbUsers() {
    const usersCollection = this.getCollection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    const filesCollection = this.getCollection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
