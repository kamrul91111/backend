const mongoose = require("mongoose");

// define playlists schema
const videosSchema = mongoose.Schema({
  name: {
    type: String,
  },
  duration: {
    type: Number,
  },
  description: {
    type: String,
  },
  dateCreated: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  // use playlist's id to link videos
  plalistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlists",
  },
});


// export model
exports.Videos = mongoose.model('Videos', playlistSchema)