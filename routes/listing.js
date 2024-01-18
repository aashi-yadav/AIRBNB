// const express=require("express");
// const router =express.Router();
// const wrapAsync=require("../utils/wrapAsync.js");
// const Listing=require("../models/listing.js");
// const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
// const listingController=require("../controllers/listing.js");


// router
// .route("/")
// .get(wrapAsync(listingController.index));
// .post(isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing));

// //INDEX ROUTE
// // router.get("/",wrapAsync(listingController.index));
// //NEW ROUTE
// router.get("/new",isLoggedIn,listingController.renderNewForm);
// //SHOW ROUTE
// router.get("/:id",wrapAsync(listingController.showListing));
// //CREATE ROUTE
// // router.post("/",isLoggedIn,validateListing,
// // wrapAsync(listingController.createListing));
// //EDIT ROUTE
// router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));

// //UPDATE ROUTE
// router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(listingController.updateListing));

// //Delete route
// router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));
// module.exports=router;


const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));
  
  //new
router.get("/new", isLoggedIn, listingController.renderNewForm);

  router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

//edit
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));



module.exports = router;
