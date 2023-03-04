const jwt = require('jsonwebtoken');

function auth (req,res,next){
const token = req.header('auth-token');
if(!token) return res.status(401).send('ACCESS DENIED');

try {
    const verified = jwt.verify(token,process.env.TOKEN_ID);
    req.user = verified;
} catch (err) {
    res.status(401).send('INVALID TOKEN'); 
}

};