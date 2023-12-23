const crypto = require('crypto');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    try {
      await dbClient.client.connect();

      const usersCollection = dbClient.db.collection('users');
      const existingUser = await usersCollection.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'Already exist' });
      }

      const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

      const newUser = {
        email,
        password: hashedPassword,
      };

      const insertResult = await usersCollection.insertOne(newUser);

      const { _id, email: newUserEmail } = insertResult.ops[0];
      return res.status(201).json({ id: _id, email: newUserEmail });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = UsersController;
