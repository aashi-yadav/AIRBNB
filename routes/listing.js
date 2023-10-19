const express=require("express");
const router =express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");





//INDEX ROUTE
router.get("/",wrapAsync(async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
}));
//NEW ROUTE
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listings/new.ejs");
});
//SHOW ROUTE
router.get("/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing does not exit!");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing})
}));
//CREATE ROUTE
router.post("/",isLoggedIn,validateListing,
wrapAsync(async(req,res,next)=>{
        // if(!req.body.listing){
        //     throw new ExpressError(400,"send valid data for listing");
        // };
        // let result=listingSchema.validate(req.body);
        // console.log(result);
        // if(result.error){
        //     throw new ExpressError(400,result.error);
        // }
        const newListing=new Listing(req.body.listing);
        newListing.owner=req.user._id;
        await newListing.save();
        req.flash("success","new listing is added!");
        res.redirect("/listings");
    
    
}));
//EDIT ROUTE
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing does not exit!");
        res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing});
}));
//UPDATE ROUTE
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async(req,res)=>{
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","listing is updated!");
    res.redirect(`/listings/${id}`);
}));
//Delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const deleteListing=await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","listing is deleted!");
    res.redirect("/listings");
}));
module.exports=router;