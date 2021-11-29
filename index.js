const express = require("express");
const app = express();
const morgan = require("morgan"); //logging api requests
const mongoose = require("mongoose"); //for databaseb connection to mongodb
const cors = require("cors"); //for http requests
require("dotenv/config"); //environmental variables
const port = process.env.PORT || 5000; // in a local environment, use 5000, for heroku or aws, use the one provided by cloud environment

// import routes
const playlistRoutes = require('./routes/playlist')

//for server sharing
app.use(cors());
app.options("*", cors()); // accept requests from all IP
app.use(express.json()); //parsing and stringifying json requests
app.use(morgan("tiny")); //requests logging

// use routes
app.use('/playlists', playlistRoutes)

//connecting to mongodb through mongoose, mongodb is not an ORM
mongoose
  .connect(process.env.CONNECTION_STRING, {
    //removed depracation warning from Mongo
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "videoapp",
  })
  .then(() => console.log("Database Connection Successful"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World!"));

// listening to port using express
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
