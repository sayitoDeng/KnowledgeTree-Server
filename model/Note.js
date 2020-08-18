const mg = require("../lib/mongoose");

const NoteSchema = new mg.Schema({
  parent_node:String,
  title:{type:String},
  content:{type:String},
  created_at: {type:String},
  updated_at: {type:String}
});

const Note = mg.model( 'Note' , NoteSchema );

module.exports = Note;