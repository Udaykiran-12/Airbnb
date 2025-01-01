const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isOwner } = require("../views/middleware.js");
const { isLoggedIn } = require("../views/middleware.js");
const { validateListing } = require("../views/middleware.js");
const listingController = require("../controllers/listing.js");

const multer  = require('multer');
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });





//Index Route
router.get(
  "/",
  wrapAsync(listingController.index)
);

//Filters Route

//mountain
router.get(
  "/mountains",
  wrapAsync(listingController.mountains)
);

//cities
router.get(
  "/cities",
  wrapAsync(listingController.cities)
);


//artics
router.get(
  "/artics",
  wrapAsync(listingController.artics)
);

//rooms
router.get(
  "/rooms",
  wrapAsync(listingController.rooms)
);

//castles
router.get(
  "/castles",
  wrapAsync(listingController.castles)
);

//pools
router.get(
  "/pools",
  wrapAsync(listingController.pools)
);

//farms
router.get(
  "/farms",
  wrapAsync(listingController.farms)
);

//camping
router.get(
  "/camping",
  wrapAsync(listingController.camping)
);


//New Route
router.get("/new", isLoggedIn,listingController.renderNewForm );

router.post(
  "/",
  isLoggedIn ,
  upload.single("listing[image]") ,
  validateListing,
  
  wrapAsync( listingController.newListing )
);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn ,
  isOwner ,
  wrapAsync( listingController.editListingForm )
);

router.put(
  "/:id",
  isLoggedIn ,
  isOwner,
  upload.single("listing[image]") ,
  validateListing,
  wrapAsync( listingController.editListing )
);

//DELETE ROUTE

router.delete(
  "/:id",
  isLoggedIn ,
  isOwner ,
  wrapAsync( listingController.destroyListing )
);

//Read Route
router.get(
  "/:id",
  wrapAsync( listingController.showListing )
);



module.exports = router;
