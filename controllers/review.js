const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


module.exports.createReview = async (req ,res , next) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    console.log(newReview);
    req.flash("success" , " New Review Created ");

    res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req ,res,next) =>{
  
    let { id , reviewID } = req.params;
   await Listing.findByIdAndUpdate(id , {$pull : {reviews :  reviewID }});
    await Review.findByIdAndDelete(reviewID);

   
    req.flash("success" , " Review Deleted ");

   res.redirect(`/listings/${id}`);
};