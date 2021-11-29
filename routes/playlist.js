const {Playlists} = require("../model/playlists"); // import model
const express = require("express");
const router = express.Router(); //to make endpoints

// it is possible to: add, delete, update, get all and get by ID

//get all
router.get("/", async (req, res) => {
  const playlists = await Playlists.find();

  // if nothing found
  if (!playlists) {
    res.status(500).json({success: false});
  } else {
    // else send all objects
    res.status(200).send(playlists);
  }
});

//get by ID
router.get("/:id", async (req, res) => {
  const playlists = await Playlists.findById(req.params.id); //find using req id

  //if does not exist
  if (!playlists) {
    res.status(500).json({message: "Item not found"});
  } else {
    // else send object
    res.status(200).send(playlists);
  }
});

//post new playlist
router.post("/", async (req, res) => {
  // grab current date and time
  const date = new Date();

  // grab attributes from request body
  let playlist = new Playlists({
    name: req.body.name,
    description: req.body.description,
    dateCreated: date,
  });

  //save playlist
  playlist = await playlist.save();

  //if null is received (empty request)
  if (!playlist) {
    res.status(500).json({message: "Nothing was sent"});
  } else {
    //else send this response
    res.status(200).send(playlist);
  }
});

//delete playlist
router.delete("/:id", (req, res) => {
  Playlists.findByIdAndDelete(req.params.id)
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

//update bundle
router.put("/:id", async (req, res) => {
  const playlist = await Playlists.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      //FOR UPDATING OTHER FIELDS, JUST PRESS ADD THEM HERE
    },
    //return the new updated data
    {new: true}
  );
  //troubleshooting
  if (!playlist) {
    return res.status(400).send("The Bundle cannot be updated");
  } else {
    res.status(200).send(playlist);
  }
});

// export all modules
module.exports = router;
