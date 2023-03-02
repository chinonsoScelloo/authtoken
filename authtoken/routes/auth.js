const router = require('express').Router(); //.Router();
const Joi = require('@hapi/joi');

//VALIDATION
const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(4).required()
})

const User = require('../model/User');
router.post('/register', async (req,res)=>{
//res.send('Register');
//VALIDATE USER BEFORE SAVING USER
const validation = Joi.validate(req.body);
res.send(validation);
// const user = new User({
//     name:req.body.name,
//     email: req.body.email,
//     password:req.body.password,
//     username:req.body.username
// });
// try {
//     const savedUser = await user.save();
//     res.send(savedUser);
// } catch (err) {
//  res.status(400).send(err)   
// }

// 
});



//router.post('/login',(req,res)=>{})

module.exports = router;
