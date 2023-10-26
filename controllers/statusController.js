 const Status=require('../models/statusModel');
 const ErrorHander = require("../utils/errorhander");
 const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// create status 

exports.addLeadStatus=catchAsyncErrors(async (req,res,next)=>{

           const leadstatus=await Status.create(req.body);

           res.status(201).json({
            success: true,
            leadstatus,
          });
})

// Delete lead status

exports.deleteLeadStatus=catchAsyncErrors(async (req,res,next)=>{
    
})  