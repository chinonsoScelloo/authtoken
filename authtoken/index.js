const express = require('express');
const app = express();

//import Routes
const authRoute = require('./routes/auth');

//Routes middleware
app.use('/api/user',authRoute);
app.listen(3000,() => console.log("running on port 300"));