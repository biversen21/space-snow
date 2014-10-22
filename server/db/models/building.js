var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BuildingSchema = new Schema({
  name: String,
  imgUrl: String,
  size: Number,
  cost: Number,
  waterProduced: { type: Number, default: 0 },
  waterConsumed: { type: Number, default: 0 },
  mineralsProduced: { type: Number, default: 0 },
  mineralsConsumed: { type: Number, default: 0 },
  refiningCapacity: { type: Number, default: 0 },
  scienceProduced: { type: Number, default: 0 },
  underConstruction: { type: Boolean, default: false }
});

module.exports = mongoose.model('Building', BuildingSchema);