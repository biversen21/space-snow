var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({

  id: Number,
  password: String,
  name: String

  buildings: [{
    id: Number,
    name: String,
    imgUrl: String,
    posX: Number,
    posY: Number,
    createdAt: Date,
    updatedAt: Date,
    waterProduced: Number,
    waterConsumed: Number,
    mineralsProduced: Number,
    mineralsConsumed: Number,
    refiningCapacity: Number,
    scienceProduced: Number,
    underConstruction: Boolean
  }],

  resources: {
    water: Number,
    minerals: Number,
    moonitonium: Number
  },

  stats: {
    waterProducedPerTurn: Number,
    waterConsumedPerTurn: Number,
    netWaterPerTurn: Number,
  }

});

PlayerSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);

  cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });

});

PlayerSchema.methods = {
  comparePassword: function(attemptedPassword, cb){
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
      cb(isMatch);
    });
  }
}

module.exports = mongoose.model('Player', PlayerSchema);