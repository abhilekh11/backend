const Lead=require('../models/leadModel');

const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ErrorHander = require("../utils/errorhander");

/// creat Lead
exports.Add_Lead = catchAsyncErrors(async (req, res, next) => {
      
    
    const lead = await Lead.create(req.body); 
  
    res.status(201).json({  
      success: true,
      message:"lead  Has Been Added Successfully",
      lead,
    });   
  
   
  });

  //// get All Lead  

  exports.getAllLead=catchAsyncErrors(async (req,res,next)=>{
    const lead= await Lead.find();
    res.status(200).json({
      success:true,  
      lead   
    })
});


//// 
