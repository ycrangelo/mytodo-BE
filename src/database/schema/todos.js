
//importing the mongoose
const mongoose = require('mongoose')

//creating a schema(its like a defining the columns of table)
const todolist = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  title: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
  todo: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  }
});

//exporting the user(userschema)
// the 'user' is for calling the schema
module.exports = mongoose.model('todo',todolist)