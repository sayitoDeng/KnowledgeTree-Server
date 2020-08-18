const mg = require("../lib/mongoose");

const NodeSchema = new mg.Schema({
  module:String,
  children:[ this ],
  collapsed:Boolean,
  created_at:String
});

const Node = mg.model( 'Node' , NodeSchema );

module.exports = Node;