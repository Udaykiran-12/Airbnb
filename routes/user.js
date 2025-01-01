const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../views/middleware.js");
const userController = require("../controllers/user.js");


//SignUp Routes
router.get("/signUp" ,userController.signUpForm );

router.post("/signUp" ,wrapAsync( userController.signUp )
);

//Login Routes

router.get("/Login" , userController.loginForm );


router.post("/Login" ,
    saveRedirectUrl ,
     passport.authenticate( "local" , { 
        failureRedirect : "/Login" ,
        failureFlash : true,
     }
    ), wrapAsync( userController.login )
);

//Logout Route

router.get("/logout" , userController.logout );




module.exports = router;