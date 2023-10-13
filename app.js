const express = require('express');
const cookieParser = require("cookie-parser");

const app = express();
const errorMiddleware=require("./middleware/error");

app.use(express.json());

app.use(express.json());
app.use(cookieParser());  

const agent =require('./routes/agentRoute');

app.use("/api/v1/",agent);

// Middleware for Error
app.use(errorMiddleware);     
 
module.exports = app;  