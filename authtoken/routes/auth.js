const router = require('express').Router(); //.Router();
const User = require('../model/User')
router.post('/register',(req,res)=>{
//res.send('Register');
const user = new User({
    name:req.body.name,
    email: req.body.email,
    password:req.body.password,
    username:req.body.username
})

});



//router.post('/login',(req,res)=>{})

module.exports = router;
