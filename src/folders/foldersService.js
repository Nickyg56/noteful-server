const xss = require('xss');

const foldersService = {
  getAllFolders(db) {
    return db.select('*').from('folders');
  },
  getById(db, id) {
    return db.select('*').from('folders').where({id}).first();
  },
  insertFolder(db, newFolder) {
    return db.insert(newFolder)
      .into('folders')
      .returning('*')
      .then(rows => rows[0]);
  },
  serializeFolder(folder){
    return {
      id: folder.id,
      folder_name: xss(folder.folder_name)
    };
  }
};

module.exports = foldersService;