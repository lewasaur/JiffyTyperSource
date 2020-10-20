const express = require("express");
const router = express.Router();

//post model
const postModel = require("../models/postModel");

//welcome page
router.get("/", (req, res) => res.render("welcome"));

// //datalist page
// router.get("/datalist", (req, res) => res.render("datalist"));

//play page
router.get("/play", (req, res) => {
  try {
    postModel.countDocuments().exec(function(err, count) {
      var random = Math.floor(Math.random() * count);
      postModel
        .findOne()
        .skip(random)
        .exec(function(err, randomPost) {
          res.render("play", { randomPost });
        });
    });
  } catch (err) {
    res.json({ msg: err });
  }
});

//NEW HIGH SCORE
router.post("/play", (req, res) => {
  updateHigh(req, res);
  res.redirect("/play");
});

//about page
router.get("/about", (req, res) => res.render("about"));

//submit page
router.get("/submit", (req, res) => res.render("submit"));

//post a text in submit page
router.post("/submit", (req, res) => {
  const { title, text, description, contributor } = req.body;
  let errors = [];

  //check required
  if (!title || !text || !description || !contributor) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //title must not exceed 40 characters
  if (title.length > 40) {
    errors.push({ msg: "title should not exceed 40 characters" });
  }

  //text length should be between 24 to 400 characters
  if (text.length < 24 || text.length > 400) {
    errors.push({ msg: "text length should be atleast 24 to 400 characters" });
  }

  if (errors.length > 0) {
    res.render("submit", {
      errors,
      title,
      text,
      description,
      contributor
    });
    //NO GOOD AAAAAA
  } else {
    postModel.findOne({ title: title }).then(textBody => {
      if (textBody) {
        //title already exists
        errors.push({ msg: "This title already exists" });
        res.render("submit", {
          errors,
          title,
          text,
          description,
          contributor
        });
      } else {
        //if ALL IS GOOD AND SAVE NEW POST
        const newPost = new postModel({
          title,
          text,
          description,
          contributor
        });

        newPost.save().then(textBody => {
          res.render("submitted");
        });
      }
    });
  }
});

//fucntion for UPDATE NEW HIGHSCORE
function updateHigh(req, res) {
  postModel.findOne({ _id: req.body.id }, (err, doc) => {
    //this will give you the document what you want to update.. then
    doc.firstname = req.body.firstname;
    doc.firstscore = req.body.firstscore;
    doc.save(function(err, doc) {});
  });
}

module.exports = router;
