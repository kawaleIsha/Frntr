const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;

let _db;
 
module.exports = {
  connectToServer: function (uri, callback) {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (err) {
        console.error("Error connecting to MongoDB:", err);
        return callback(err);
      }
      _db = db.db("cstmrvw");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },
 
  getDb: function () {
    if (!_db){
      console.error("Database not initialised. Call connectToServer first.");
    }
    return _db;
  },
};