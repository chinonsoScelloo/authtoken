const router = require('express').Router(); //.Router();
//move the schema to a file called validation.js

const User = require('../model/User');
router.post('/register', async (req,res)=>{
//res.send('Register');
//VALIDATE USER BEFORE SAVING USER
//get the error response
const {error} = schema.validate(req.body);
//CHECK FOR ERROR
if (error) return res.status(400).send(error.details[0].message)

//res.send(error.details[0].message);


//const validation = schema.validate(req.body);
//const validation = Joi.validate(req.body,schema) method deprecated
//schema.validateAsync(req.body,schema) returns empty object because of the async nature.
//res.send(validation);

const user = new User({
    name:req.body.name,
    email: req.body.email,
    password:req.body.password,
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
