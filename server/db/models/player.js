var bcrypt = require('bcrypt-nodejs');
var Bluebird = require('bluebird');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({

  password: String,
  name: String,

  buildings: [{
    name: String,
    imgUrl: String,
    position: Number,
    size: Number,
    waterProduced: { type: Number, default: 0 },
    waterConsumed: { type: Number, default: 0 },
    mineralsProduced: { type: Number, default: 0 },
    mineralsConsumed: { type: Number, default: 0 },
    refiningCapacity: { type: Number, default: 0 },
    scienceProduced: { type: Number, default: 0 },
    underConstruction: { type: Boolean, default: false }
  }],

  resources: {
    water: Number,
    minerals: Number,
    moonitonium: Number
  }

});

PlayerSchema.pre('save', function(next) {
  var cipher = Bluebird.promisify(bcrypt.hash);

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
};

module.exports = mongoose.model('Player', PlayerSchema);