require('dotenv').config()
const mongoose = require('mongoose')

if (process.env.MONGODB_URI) {
    console.log("connected through process.env.MONGODB_URI")
    mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true });
  }
  else {
    console.log("process.env.MONGODB_URI not found, connected to localhost")
    mongoose.connect('mongodb://localhost/stocksTracker');
  }
  mongoose.connection.on('error', function(err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
    }
  );
  mongoose.connection.once('open', function() {
    console.log("Mongoose has connected to MongoDB!");
  });

  module.exports = mongoose;