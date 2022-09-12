const User = require("../models/user");
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt =  require('express-jwt');

exports.signup = (req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param
        })
    }

  const user = new User(req.body);
  user.save( (err, user) => {
    if(err){
        return res.status(400).json({
            err: "NOT able to save user in DB"
        });
    }
    res.json(
        // user
        {
        name : user.name,
        email : user.email,
        id : user._id
    }
    );
  });
};


exports.signin =  (req, res) => {

    const errors = validationResult(req);
    const { email, password } =  req.body; // this means destructuring

    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.findOne({email}, (err, user) => {
        if(err || !user ){
            return res.status(400).json({
                error: "User does not exist"
            })
        }

        if(!user.authenticate(password)){
          return res.status(401).json({
                error: "Email and Password do not match"
            })
        }
        //CREATE TOKEN
        const token =  jwt.sign({ _id: user._id}, process.env.SECRET)

        // PUT TOKEN INTO COOKIE

        res.cookie("token", token, {expire: new Date() + 9999});

        // send response to front end

        const {_id, name, email, role} = user;

        return res.json({ token, user : {_id, name, email, role}});


    })
};

exports.signout = (req, res) => {
    res.clearCookie("token");

    res.json({
        message : "user signout successfully"
    });
};