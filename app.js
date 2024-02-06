const express = require('express');
const cookieParser = require("cookie-parser");
const useragent = require('express-useragent');
const app = express();
var cors = require('cors');
const errorMiddleware=require("./middleware/error");
const scheduleJob1=require("./controllers/sentNotificationWebController");
////  this line add
const connectDatabase = require('./config/database');
////   this line add
app.use(useragent.express());
app.use(express.json());
app.use(cookieParser());  
app.use(express.static('public'));
////  this line add
app.use(connectDatabase);  
////  this line add
const agent =require('./routes/agentRoute');
const product_service=require('./routes/productserviceRoute');
const lead_source=require('./routes/leadsourceRoute');
const lead_status=require('./routes/statusRoute');
const lead=require('./routes/leadRoute');
const countries_state=require('./routes/country_stateRoute');
const followup=require('./routes/followupRoute');
const calllog=require('./routes/calllogRoute');
const lostreason=require('./routes/lostreasonRoute');
const YearlySaleApi=require('./routes/genralapiRoute');
const Updateandsavenotification=require('./routes/notificationRoute');
const excelUplode=require('./routes/excelUplodeRoute');
const LeadFileUplode=require('./routes/leadFileRoute');
const Report=require('./routes/allReportRoute');
const socialmedialead=require('./routes/socialmedialeadRoute');

// scheduleJob1();
app.use(cors());
app.use("/api/v1/",agent);
app.use("/api/v1/",product_service); 
app.use("/api/v1/",lead_source); 
app.use("/api/v1/",lead_status);
app.use("/api/v1/",lead);
app.use("/api/v1/",countries_state); 
app.use("/api/v1/",followup);
app.use("/api/v1/",calllog);
app.use("/api/v1/",lostreason);
app.use("/api/v1/",YearlySaleApi);
app.use("/api/v1/",Updateandsavenotification);
app.use("/",excelUplode);  
app.use("/",LeadFileUplode);  
app.use("/api/v1/",Report); 
app.use(socialmedialead);
// app.use("/api/v1/",updateandsavenotification1)

app.get('/', function (req, res) { 
      try {  
        res.status(200).send(
          { 
          "success":true, 
           "massage":"Backend Get  Product"   
          }
        );   
          
        } catch (error) { 
          res.status(500).send(error);  
        }  
  }); 


// Middleware for Error
app.use(errorMiddleware);     
 
module.exports = app;  