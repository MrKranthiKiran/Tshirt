const express = require("express");

const router  = express.Router();

const {getCategoryById,createCategory, getAllCategory, updateCategory, removeCategory} = require("../controllers/category");
const {isSignedIn, isAuthenticated , isAdmin} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// Params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// actual routers goes here

// Create routes
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);

// Read Routes
router.get("/category/:categoryId", getCategoryById);

router.get("/categories", getAllCategory);

// Update

router.put("/category/:categoryId/:userId",
 isSignedIn, 
 isAuthenticated, 
 isAdmin, 
 updateCategory);

 // Delete

 router.delete("/category/:categoryId/:userId",
 isSignedIn, 
 isAuthenticated, 
 isAdmin, 
 removeCategory
 );
 

module.exports = router;