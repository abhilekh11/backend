const Lead=require('../models/leadModel');
const agent=require('../models/agentModel');
const FollowupLead=require('../models/followupModel');

const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ErrorHander = require("../utils/errorhander");


/// creat followup Lead
exports.Add_Followup_Lead=catchAsyncErrors(async (req,res,next)=>{
    const followuplead = await FollowupLead.create(req.body); 
    res.status(201).json({  
      success: true,  
      message:"lead  Has Been Added Successfully",
      followuplead,  
    });    
})


/// 




