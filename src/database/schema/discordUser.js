const mongoose = require('mongoose');

const discordUserSchema = new mongoose.Schema({
 discordID: {
  type: mongoose.SchemaTypes.String,
  required: true,
 },
 discordNAME: {
  type: mongoose.SchemaTypes.String,
  required: true,
 },
 createdAt: {
  type: mongoose.SchemaTypes.Date,
  required: true,
  default: new Date(),
 }
});

module.exports = mongoose.model('discord_user',discordUserSchema)