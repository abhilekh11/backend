const socialmedialead=require('../models/socialmedialeadModel');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



// create status 

exports.addAllSocialMediaLead=catchAsyncErrors(async (req,res,next)=>{
            const llll={name:'sdsd',email:'annn@'}
          const leadadd=await socialmedialead.create(llll)
          res.status(201).json({
           success: true,
           message:'Lead Add',
           leadadd
         });   
})


// get All Lead Status 
exports.getAllSocialMediaLead=catchAsyncErrors(async(req,res,next)=>{
        const  SocialMediaLead=await socialmedialead.find();
         res.status(200).json({
           success:true,
           SocialMediaLead
         })
})

////  

