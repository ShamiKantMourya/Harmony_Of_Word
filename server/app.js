const express = require("express");
const app = express();

if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config({path: "server/config/.env"});
}

module.exports = app;