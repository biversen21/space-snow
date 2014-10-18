var mongoose = require('mongoose');
var mongoUri = process.env.MONGO_URI || 'mongodb://localhost/moonbase';
mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error:'));
db.on('error', console.error.bind(console, 'Mongo connection successful:'));
