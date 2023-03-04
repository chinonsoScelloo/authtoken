const router = require('express').Router(); //.Router();
const verify = require('./verifyToken');
const User = require('../model/User');

//add the middleware on the parameter to make it private
router.get('/',verify,(req,res)=>{
    // res.json({
    //     posts:{
    //         title:"MY POST",
    //         description:"DATA NOT AVAILABLE WITHOUT LOGIN"
    //     }
    // })
    res.send(req.user);
   // User.findOne(req.user);
})
module.exports = router;
