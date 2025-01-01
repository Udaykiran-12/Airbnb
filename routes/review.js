const express = require("express");
const router = express.Router({ mergeParams : true });
const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview,
     isLoggedIn  ,
     isAuthorReview 
    } = require("../views/middleware.js");

    const reviewController = require("../controllers/review.js");










//Review
// Post Review Route

router.post("/" ,
    isLoggedIn ,
    validateReview,
     wrapAsync( reviewController.createReview)
);

//Delete Review Route

router.delete("/:reviewID" ,
    isLoggedIn ,
    isAuthorReview,
     wrapAsync( reviewController.destroyReview )
);


module.exports = router;