
var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');

const {signout, signup, signin} =  require("../controllers/auth")


router.post("/signup", [
    check("name", "name should be at least 3 characters").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "Password should at least be 8 characters").isLength({min: 8})
],signup);


router.post("/signin",
 [
    check("email", "email is required").isEmail(),
    check("password", "Password field is required").isLength({min: 1})
],signin);

router.get("/signout", signout);




module.exports = router;