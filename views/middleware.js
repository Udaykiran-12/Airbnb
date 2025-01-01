const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { reviewSchema } = require("../schema.js");

module.exports.isLoggedIn = ( req ,res , next ) =>{
    if(!req.isAuthenticated()){

        //RedirectUrl 
        req.session.redirectUrl = req.originalUrl;

        req.flash("error" , " You are not Logged in ");
        return res.redirect("/Login");

    }

    next();
};


module.exports.saveRedirectUrl = ( req ,res,next) =>{

    if( req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isOwner = async ( req , res , next ) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error" , " You are not the Owner of this Listing ");
        return res.redirect(`/listings/${id}`);
    }
    next();

};



// Function For Validate Listing from Server Side
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    
    if (error) {
      const msg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, msg);
    }
    next();
  };




  
// Function For Validate Review from Server Side
module.exports.validateReview = (req ,res , next ) =>{
    const  {error}  = reviewSchema.validate(req.body);
    if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, msg);
   }
next();
};




module.exports.isAuthorReview = async ( req , res , next ) =>{
    let { id , reviewID } = req.params;
    let review = await Review.findById(reviewID);

    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error" , " You are not the author of this review ");
        return res.redirect(`/listings/${id}`);
    }
    next();

};