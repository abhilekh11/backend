const express = require('express');
const cookieParser = require("cookie-parser");

const app = express();
var cors = require('cors');
const errorMiddleware=require("./middleware/error");

app.use(express.json());

app.use(express.json());
app.use(cookieParser());  

const agent =require('./routes/agentRoute');
const product_service=require('./routes/productserviceRoute');
const lead_source=require('./routes/leadsourceRoute');
const lead_status=require('./routes/statusRoute');
const lead=require('./routes/leadRoute');
 
app.use(cors());
app.use("/api/v1/",agent);
app.use("/api/v1/",product_service); 
app.use("/api/v1/",lead_source); 
app.use("/api/v1/",lead_status);
app.use("/api/v1/",lead);

app.get('/', function (req, res) {
    try {
        res.status(200).send(
          {
          "success":true, 
           "massage":"get Product"   
          }
        );   
         
        } catch (error) { 
          res.status(500).send(error);  
        }
  });


// Middleware for Error
app.use(errorMiddleware);     
 
module.exports = app;  