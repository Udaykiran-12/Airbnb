const Listing = require("../models/listing.js");



module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  };

  module.exports.renderNewForm =(req, res) => {
    res.render("listings/new.ejs");
  };


  module.exports.newListing = async (req, res, next) => {
    // if (!req.body.listing) {
    //   throw new ExpressError(400, "Send Valid Data For Listing");
    // }

   
    
  
     let url = req.file.path;
     let filename = req.file.filename;
     const listing = new Listing(req.body.listing);
     listing.owner = req.user._id;
     listing.image = { url , filename };

     const list = await listing.save();
     console.log(list);
     req.flash("success", " New Listing Created ");

     res.redirect("/listings");
  };


  module.exports.editListingForm = async (req, res) => {
      let { id } = req.params;
      let listing = await Listing.findById(id);
  
      if (!listing) {
        req.flash("error", " Listing you requested for edit is does not exist ");
        res.redirect("/listings");
      }
       
      let originalUrlImage = listing.image.url;
      originalUrlImage = originalUrlImage.replace("/upload" , "/upload/w_300/e_blur:50");
      res.render("listings/edit.ejs", { listing , originalUrlImage  });
    };


    module.exports.editListing = async (req, res) => {
        let { id } = req.params;
    
        let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

        if(typeof req.file !== "undefined"){

        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url , filename };
        await listing.save();

        }

        req.flash("success", "  Listing Updated ");
    
        res.redirect(`/listings/${id}`);
      };


      module.exports.destroyListing = async (req, res) => {
        let { id } = req.params;
         await Listing.findByIdAndDelete(id);
        
        req.flash("success", " Listing Deleted ");
        res.redirect("/listings");
      };

      module.exports.showListing = async (req, res) => {
        let { id } = req.params;
        let listing = await Listing.findById(id)
        .populate({ 
        path : "reviews",
        populate : {
          path : "author",
        },
        })
        .populate("owner");
    
        if (!listing) {
          req.flash("error", " Listing you requested for does not exist ");
          res.redirect("/listings");
        }
    
        res.render("listings/show.ejs", { listing });
      };
      


