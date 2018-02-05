var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
  name: String,
  price: String,
  location: String,
  lat: Number,
  lng: Number,
  image: String,
  description: String,
  createdAt: {  type: Date, default: Date.now },
  author: {
            id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User"
                 },
            username: String
          },
  comments: [
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment"
              }
            ]
});

// if you dont export, an empty object will be generated for Campground variable in app.js
module.exports = mongoose.model("Campground", campgroundSchema);

