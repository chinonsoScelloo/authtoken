const jwt = require('jsonwebtoken');

//export the function to make it private
module.exports = function(req,res,next){
const token = req.header('auth-token');
if(!token) return res.status(401).send('ACCESS DENIED');

try {
    const verified = jwt.verify(token,process.env.TOKEN_ID);
    req.user = verified;
    next();
} catch (err) {
    res.status(401).send('INVALID TOKEN'); 
}

};