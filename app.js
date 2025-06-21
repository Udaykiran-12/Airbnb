if(process.env.NODE_ENV != "production"){
    require('dotenv').config();

}

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");



const listingRouter= require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");



app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));

app.use(express.static(path.join(__dirname , "public")));
app.use(express.urlencoded({extended : true }));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);

const port = 8080;

const MongoUrl = "mongodb://127.0.0.1:27017/Wanderlust";
const dbUrl = process.env.ATLASDB_URL;



main()
.then(() =>{
     console.log("successful connection");
         })
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
};


const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 3600,
});

store.on( "error" , () =>{
    console.log("ERROR in MONGO SESSION STORE" , err);
});

//Session Options Object
const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
};



app.use(session(sessionOptions));
app.use(flash());

//Passports Middlewares
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash Middlewares
app.use(( req ,res , next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})


app.listen(port , () =>{
    console.log("Server is listening at port 8080");
});


// app.get("/" , (req,res) =>{
//     res.send("Root is Working");
// });






    
app.use("/listings" , listingRouter);
app.use("/listings/:id/reviews" , reviewRouter);
app.use("/" , userRouter);


    

// app.get("/test" , wrapAsync(async (req,res) => {
//   const sample = new Listing({
//     title : "My New Villa",
//     description : "By the Beach",
//     price : 25000,
//     location : "Calangute , Goa",
//     country : "INDIA",

//   })

  
//   await sample.save();
//   console.log("db saved");
//   res.send("Succesful test");
// })
// );







// For All Routes Except Above Routes
app.all( "*" , (req ,res ,next )=>{
    next(new ExpressError( 401 , "Page Not Found !!"));
    
    
});


//Error Handling Middleware




app.use( ( err ,req , res , next ) =>{
    
    let { status = 500  , message = "Something Went Wrong" } = err;
    // res.status(status).send(message);
    res.status(status).render("error.ejs" , { message });
    
});




