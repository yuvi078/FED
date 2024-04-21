const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://Piyush:Piyush%407820@cluster0.h0ddjdt.mongodb.net/Spotify-clone";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });
