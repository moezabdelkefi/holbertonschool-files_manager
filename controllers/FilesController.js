const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const DBClient = require('../utils/db');

class FilesController {
  static async postUpload(request, response) {
    try {
      const {
        name,
        type,
        data,
        parentId = 0,
        isPublic = false,
      } = request.body;

      if (!name) {
        return response.status(400).json({ error: 'Missing name' });
      }

      if (!type || !['folder', 'file', 'image'].includes(type)) {
        return response.status(400).json({ error: 'Missing or invalid type' });
      }

      if ((type !== 'folder' && !data) || (data && typeof data !== 'string')) {
        return response.status(400).json({ error: 'Missing or invalid data' });
      }

      // If parentId is set, validate it
      if (parentId !== 0) {
        const parentFile = await DBClient.db.collection('files').findOne({ _id: parentId });
        if (!parentFile) {
          return response.status(400).json({ error: 'Parent not found' });
        }
        if (parentFile.type !== 'folder') {
          return response.status(400).json({ error: 'Parent is not a folder' });
        }
      }

      let localPath = '';
      if (type !== 'folder') {
        const storingFolder = process.env.FOLDER_PATH || '/tmp/files_manager';
        const fileId = uuidv4();
        localPath = path.join(storingFolder, fileId);
        fs.writeFileSync(localPath, Buffer.from(data, 'base64'));
      }

      const newFile = {
        userId: request.user.id,
        name,
        type,
        isPublic,
        parentId,
        localPath: type !== 'folder' ? localPath : undefined,
      };

      const result = await DBClient.db.collection('files').insertOne(newFile);
      const createdFile = { id: result.insertedId, ...newFile };

      return response.status(201).json(createdFile);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = FilesController;
