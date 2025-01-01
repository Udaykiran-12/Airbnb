const User = require("../models/user.js");

module.exports.signUpForm =  (req ,res) =>{
    res.render("users/signUp.ejs");
};


module.exports.signUp = async ( req,res, next) =>{

    try{
        let { username , email , password } = req.body;
        const newUser = new User({ username , email });
        const registeredUser = await User.register( newUser , password );
        console.log(registeredUser);

        req.login( registeredUser , (err) =>{
            if(err){
              return next(err);
            }

            req.flash("success" , " Welcome To WanderLust  ");
            res.redirect("/listings");

        });
        

    }catch(e){
        req.flash("error" , e.message);
        res.redirect("/signUp");
    }
    
    

};


module.exports.loginForm = (req ,res) =>{
    res.render("users/Login.ejs");
};


module.exports.login = async ( req ,res , next) =>{
    req.flash( "success" , "Welcome Back to WanderLust ");
    let redirectUrl = res.locals.redirectUrl  || "/listings";
    res.redirect(redirectUrl);
};


module.exports.logout = ( req ,res , next) =>{

    req.logout( (err) =>{

        if(err){
             return next(err);
        }

        req.flash("success" , " You are Logged Out ");
        res.redirect("/listings");
    });
};