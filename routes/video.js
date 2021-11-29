const {Videos} = require("../model/videos");
const express = require("express");
const router = express.Router(); //to make endpoints

//get all
router.get("/", async (req, res) => {
  const videos = await Videos.find();

  // if nothing found
  if (!videos) {
    res.status(500).json({success: false});
  } else {
    // else send all objects
    res.status(200).send(videos);
  }
});

//get by ID
router.get("/:id", async (req, res) => {
  const videos = await Videos.findById(req.params.id); //find using req id

  //if does not exist
  if (!videos) {
    res.status(500).json({message: "Item not found"});
  } else {
    // else send object
    res.status(200).send(videos);
  }
});

//post new video
router.post("/", async (req, res) => {
  // grab current date and time
  const date = new Date();

  // grab attributes from request body
  let video = new Videos({
    name: req.body.name,
    duration: req.body.duration,
    description: req.body.description,
    dateCreated: date,
    thumbnail: req.body.thumbnail,
    playlistId: req.body.playlistId,
  });

  //save playlist
  video = await video.save();

  //if null is received (empty request)
  if (!video) {
    res.status(500).json({message: "Nothing was sent"});
  } else {
    //else send this response
    res.status(200).send(video);
  }
});

//delete video
router.delete("/:id", (req, res) => {
  Videos.findByIdAndDelete(req.params.id)
    .then(item => {
      // if found
      if (item) {
        return res
          .status(200)
          .json({success: true, message: " Playlist was removed "});
      } else {
        return res
          .status(404)
          .json({success: false, message: " Playlist not found "});
      }
    })
    //if req doesnt go through
    .catch(err => {
      return res.status(400).json({success: false, error: err});
    });
});

//update video
router.put("/:id", async (req, res) => {
  const video = await Videos.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      duration: req.body.duration,
      description: req.body.description,
      thumbnail: req.body.thumbnail,
      playlistId: req.body.playlistId,
      //FOR UPDATING OTHER FIELDS, JUST PRESS ADD THEM HERE
    },
    //return the new updated data
    {new: true}
  );
  //troubleshooting
  if (!video) {
    return res.status(400).send("The Bundle cannot be updated");
  } else {
    res.status(200).send(video);
  }
});

// export all modules
module.exports = router;
