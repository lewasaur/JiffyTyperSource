const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  description: { type: String, default: "no description" },
  contributor: String,
  date_created: { type: Date, default: Date.now },
  firstname: String,
  secondname: [String],
  thirdname: [String],
  firstscore: { type: Number, default: 997 },
  secondscore: { type: Number, default: 998 },
  thirdscore: { type: Number, default: 999 }
});

module.exports = mongoose.model("Posts", PostSchema);
