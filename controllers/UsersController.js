const crypto = require('crypto');
const dbClient = require('../utils/db');

const UsersController = {
  postNew: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Missing email' });
      }

      if (!password) {
        return res.status(400).json({ error: 'Missing password' });
      }

      const userExists = await dbClient.getUserByEmail(email);
      if (userExists) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

      const newUser = {
        email,
        password: hashedPassword,
      };

      const createdUser = await dbClient.createUser(newUser);

      const responseUser = {
        email: createdUser.email,
        id: createdUser._id,
      };

      res.status(201).json(responseUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

    return res;
  },
};

module.exports = UsersController;
