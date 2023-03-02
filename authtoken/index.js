const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//import Routes
const authRoute = require('./routes/auth');

dotenv.config();
//Connect to db
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser: true})
.then(()=> console.log('connected to DataBase'))
.catch((err)=>{console.log("failed to connect to MongoDb",err)});

//middleware
app.use(express.json);
//Routes middleware
app.use('/api/user',authRoute);
app.listen(3000,() => console.log("running on port 3000"));