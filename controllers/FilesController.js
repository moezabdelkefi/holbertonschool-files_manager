const DBClient = require('../utils/db');

class FilesController {
  static async putPublish(request, response) {
    const fileId = request.params.id;
    const userId = request.user.id; // Assuming user info is extracted from the token

    const file = await DBClient.getFile(fileId);
    if (!file || file.userId !== userId) {
      return response.status(404).json({ error: 'Not found' });
    }

    file.isPublic = true;
    await DBClient.updateFile(fileId, { isPublic: true });

    return response.status(200).json(file);
  }

  static async putUnpublish(request, response) {
    const fileId = request.params.id;
    const userId = request.user.id; // Assuming user info is extracted from the token

    const file = await DBClient.getFile(fileId);
    if (!file || file.userId !== userId) {
      return response.status(404).json({ error: 'Not found' });
    }

    file.isPublic = false;
    await DBClient.updateFile(fileId, { isPublic: false });

    return response.status(200).json(file);
  }
}

module.exports = FilesController;
