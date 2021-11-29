const mongoose = require("mongoose");

// define playlists schema
const playlistSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  dateCreated: {
    type: Date,
  },
});


// export model
exports.Playlists = mongoose.model('Playlists', playlistSchema)