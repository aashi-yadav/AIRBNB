const User=require("../models/user")

module.exports.renderSignup=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    const newUser=new User({email,username});
    const regUser= await User.register(newUser,password);
    console.log(regUser);
    req.login(regUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","welcum to wander");
        res.redirect("/listings")
    })
    
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};
module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login=async(req,res)=>{
    req.flash("success","wlcum back to wanderlust!") ;
    let redirectUrl=res.locals.redirectUrl||"/listings"
    res.redirect(redirectUrl);
 };
 module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
    if(err){
        return next(err);
    }
    req.flash("success"," u r logged out!") ;
    res.redirect("/listings");
})
};