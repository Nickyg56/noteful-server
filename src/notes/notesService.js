const xss = require('xss');

const notesService = {
  getAllNotes(db) {
    return db.select('*').from('notes');
  },
  getById(db, id) {
    return db.select('*').from('notes').where({id}).first();
  },
  insertNote(db, newNote) {
    return db.insert(newNote)
      .into('notes')
      .returning('*')
      .then(rows => rows[0]);
  },
  deleteNote(db, id) {
    return db('notes')
      .where({id})
      .delete();
  },
  updateNote(db, id, newNoteFields) {
    return db('notes')
      .where({id})
      .update(newNoteFields);
  },
  serializeNote(note){
    return {
      id: note.id,
      note_name: xss(note.note_name),
      date_modified: note.date_modified,
      folder_id: note.folder_id,
      content: xss(note.content)
    };
  } 
};

module.exports = notesService;