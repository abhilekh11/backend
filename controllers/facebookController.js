const socialmedialead=require('../models/socialmedialeadModel');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// create status 

exports.addAllSocialMediaLead=catchAsyncErrors(async (req,res,next)=>{
    const body = req.body;
   if (body.object === 'page') {
      body.entry.forEach(async entry => {
        const webhookEvent = entry.messaging[0];
        // Extract data from webhookEvent
        const { name, email, phone } = webhookEvent;
       try {
          // Create a new SocialMediaLead document
          const newLead = new socialmedialead({
            name,
            email,
            phone
          });
    // Save the new lead to the database
          await newLead.save();
           console.log("New lead added:", newLead);
        } catch (error) {
          console.error("Error adding new lead:", error);
          res.status(500).send("Internal Server Error");
          return;
        }
      });
      res.status(200).send('EVENT_RECEIVED');
    } else {
      res.sendStatus(404);
    }
})

// get All Lead Status 
exports.AllSocialMediaLead=catchAsyncErrors(async(req,res,next)=>{

    const VERIFY_TOKEN = 'abc123'; // Replace with your verification token
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
  
    if (mode && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  
})

////  


// get All Lead Status 
exports.getAllSocialMediaLead=catchAsyncErrors(async(req,res,next)=>{
        const  SocialMediaLead=await socialmedialead.find();
         res.status(200).json({
           success:true,
           SocialMediaLead
         })
})

////  

