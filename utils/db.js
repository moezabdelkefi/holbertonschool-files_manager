const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    this.client = new MongoClient(`mongodb://${host}:${port}`, { useUnifiedTopology: true });
    this.db = null;

    this.client.connect((err) => {
      if (err) {
        console.log(err);
      } else {
        this.db = this.client.db(database);
        console.log('Connection to MongoDB successful');
      }
    });
  }

  isAlive() {
    return this.db !== null;
  }

  async getUserByEmail(email) {
    const usersCollection = this.db.collection('users');
    return usersCollection.findOne({ email });
  }

  async createUser(user) {
    const usersCollection = this.db.collection('users');
    const result = await usersCollection.insertOne(user);
    return result.ops[0];
  }

  async nbUsers() {
    const usersCollection = this.db.collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    const filesCollection = this.db.collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
