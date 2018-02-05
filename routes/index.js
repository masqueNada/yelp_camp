var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

// Root ROUTE
router.get("/", function(req, res){
  res.render("landing");
});


// ==============
// AUTH ROUTES
// ==============
  // Sign Up FORM ROUTE
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

  // Sign Up LOGIC
router.post("/register", function(req, res){
  var newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, function(err, user){
      if(err) {
        req.flash("error", err.message);
        return res.redirect("register");
      }
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Hello, " + user.username + ". Welcome to YelpCamp :)");
        res.redirect("/campgrounds");
      });
  });
});

  // Login FORM ROUTE
router.get("/login", function(req, res){
    res.render("login", {page: "login"});
});

  // Login LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: "Invalid username or password!"
    }), function(req, res){});

  // Logout ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Successfully logged out!");
    res.redirect("/campgrounds");
});


module.exports = router;