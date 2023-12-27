const mongoose = require('mongoose');

const facebookUserSchema = new mongoose.Schema({
 facebookID: {
  type: mongoose.SchemaTypes.String,
  required: true,
 },
 facebookNAME: {
  type: mongoose.SchemaTypes.String,
  required: true,
 },
 createdAt: {
  type: mongoose.SchemaTypes.Date,
  required: true,
  default: new Date(),
 }
});

module.exports = mongoose.model('facebook_user',facebookUserSchema)