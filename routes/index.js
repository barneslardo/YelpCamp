var express = require("express");
var router = express.Router();
var campground = require("../models/campground");
var comment = require("../models/comment");
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});

// Show register form
router.get("/register", function(req, res){
    res.render("register");
});
// Handle Sign Up Logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Yelp Camp " + user.username);
           res.redirect("/campgrounds"); 
        });
    });
});

// Show Login Form
router.get("/login", function(req, res){
    res.render("login");
});
// Login Logic
router.post("/login", passport.authenticate("local", 
    {
            successRedirect: "/campgrounds",
            failureRedirect: "/login"
        }), function(req, res){
});

// Logout Route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!!!");
    res.redirect("/campgrounds");
});

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

module.exports = router;