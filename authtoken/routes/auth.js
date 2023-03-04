const router = require('express').Router(); //.Router();
//move the schema to a file called validation.js
const {registerValidation,loginValidation} = require('../validation');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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
    res.send({user:user._id});
} catch (err) {
 res.status(400).send(err)   
}


});



//router.post('/login',(req,res)=>{})
router.post('/login', async(req,res)=>{
    const { error } = loginValidation(req.body);
    //CHECK FOR ERROR
    if (error) return res.status(400).send(error.details[0].message);
    
    //CHECK IF USER EXIST
    const user = await User.findOne({ email: req.body.email });
    const usernameExist = await User.findOne({username: req.body.username});
    if (!user || usernameExist) return res.status(500).send('Email or Password does not exist');

    // CHECK IF PASSWORD IS VALID
    const validPass = bcrypt.compare(req.body.password, user.password);
    if(!validPass)return res.status(500).send('Incorrect user email and password ');

    //CREATE TOKEN 
    const token = jwt.sign({_id: user._id},process.env.TOKEN_ID);
    res.header('auth-token',token).send(token);


    //res.send('SUCCESSFULLY LOGIN');
})

module.exports = router;
