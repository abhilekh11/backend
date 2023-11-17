const express = require('express');
const cookieParser = require("cookie-parser");
const useragent = require('express-useragent');
const app = express();
var cors = require('cors');
const errorMiddleware=require("./middleware/error");


app.use(useragent.express());
app.use(express.json());
app.use(cookieParser());  

const agent =require('./routes/agentRoute');
const product_service=require('./routes/productserviceRoute');
const lead_source=require('./routes/leadsourceRoute');
const lead_status=require('./routes/statusRoute');
const lead=require('./routes/leadRoute');
const countries_state=require('./routes/country_stateRoute');
const followup=require('./routes/followupRoute');
const calllog=require('./routes/calllogRoute');
 
app.use(cors());
app.use("/api/v1/",agent);
app.use("/api/v1/",product_service); 
app.use("/api/v1/",lead_source); 
app.use("/api/v1/",lead_status);
app.use("/api/v1/",lead);
app.use("/api/v1/",countries_state);
app.use("/api/v1/",followup);
app.use("/api/v1/",calllog);
app.get('/', function (req, res) {
    
  // res.end(`The client's IP Address is: ${req.socket.remoteAddress}`);
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