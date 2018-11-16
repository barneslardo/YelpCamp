var dotenv        = require("dotenv").config(),
    express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Campground    = require("./models/campground"),
    seedDB        = require("./seeds"),
    flash         = require("connect-flash"),
    Comment       = require("./models/comment"),
    passport      = require("passport"),
    User          = require("./models/user"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override")
    
 //seedDB();    
    var commentRoutes    = require("./routes/comments"),
        campgroundRoutes = require("./routes/campgrounds"),
        indexRoutes       = require("./routes/index")
    
mongoose.connect('mongodb://localhost:27017/dynamic_price', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// Passport Config
app.use(require("express-session")({
    secret: "poop on a loop makes bad soup",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelp Camp Server Has Started!");
});