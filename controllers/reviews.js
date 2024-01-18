const Review=require("../models/review");
const Listing=require("../models/listing");

module.exports.createReview=async(req,res)=>{
    let listing=  await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    listing.reviews.push(newReview);
    newReview.author=req.user._id;
    await newReview.save();
    await listing.save();
    req.flash("success","new review is added!");
    res.redirect(`/listings/${listing._id}`);
    
    };

    module.exports.deleteReview=async(req,res)=>{
        let {id,reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        await Review.findByIdAndDelete(reviewId);
        req.flash("success","review is deleted!");
        res.redirect(`/listings/${id}`);
        
        }
