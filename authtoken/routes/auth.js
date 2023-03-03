const router = require('express').Router(); //.Router();
//move the schema to a file called validation.js
const {registerValidation, loginValidation} = require('../validation');
const User = require('../model/User');
const bcrypt = require('bcryptjs');


router.post('/register', async (req,res)=>{
//res.send('Register');
//VALIDATE USER BEFORE SAVING USER
//get the error response
//const {error} = schema.validate(req.body);
const {error} = registerValidation(req.body);
//CHECK FOR ERROR
if (error) return res.status(400).send(error.details[0].message);

//CHECK IF USER EXIST
const emailExist = await User.findOne({email: req.body.email});
const usernameExist = await User.findOne({username: req.body.username});
if (emailExist || usernameExist) return res.status(500).send('User with email and username already exist');
//res.send(error.details[0].message);


//const validation = schema.validate(req.body);
//const validation = Joi.validate(req.body,schema) method deprecated
//schema.validateAsync(req.body,schema) returns empty object because of the async nature.
//res.send(validation);

//HASH PASSWORD WITH BCRYPT
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password,salt);
const user = new User({
    name:req.body.name,
    email: req.body.email,
    password:hashedPassword,
    username:req.body.username
});
try {
    const savedUser = await user.save();
    res.send(savedUser);
} catch (err) {
 res.status(400).send(err)   
}


});



//router.post('/login',(req,res)=>{})

module.exports = router;
