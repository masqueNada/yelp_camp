var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),    
    Campground      = require("./models/campground"),
    seedDB          = require("./seeds"),
    flash           = require("connect-flash"),
    User            = require("./models/user"),
    methodOverride  = require("method-override"),
    Comment         = require("./models/comment");

var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index"); 

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v11"
mongoose.connect(url);
// =====================================
// ENVIRONMENT VARIABLES FOR DATABASES
// =====================================
// mongoose.connect("mongodb://localhost/yelp_camp_v11");
// mongoose.connect("mongodb://onurdursun:pass@ds111618.mlab.com:11618/yelpcamp_v11");
// =====================================

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
// seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware to pass current user and/or flash message to every route template:
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ROUTES SETUP
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

// SERVER SETUP
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log("YelpCamp Server is listening on port:" + port);
});