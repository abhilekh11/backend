
const Lead_Source=require('../models/leadsourceModel');
const CallLog=require('../models/callLogModel');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ErrorHander = require("../utils/errorhander");


exports.Add_CallLog = catchAsyncErrors(async (req, res, next) => {

   const {datetime,user_id}=req.body;
    
   const call_log=await CallLog.find({datetime});
   
      
   if(call_log.length === 0){
    const calllog = await CallLog.create(req.body);
  
    res.status(201).json({
      success: true,
      message: "CallLog Has Been Added Successfully",
      calllog,
    }); 
   }else{
    res.status(201).json({
      success: true,
      message: "CallLog Already Added",
      
    });
   }
   
  });


  // exports.getCallLogById=catchAsyncErrors(async (req,res,next)=>{

  // })