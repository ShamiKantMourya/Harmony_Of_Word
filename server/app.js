const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();


if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config({path: "server/config/.env"});
}


//Middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
//importing routes 
const post = require("./routes/post");
const user = require("./routes/user");

//routes to use
app.use("/post", post);
app.use("/user", user);


module.exports = app;