const Lead=require('../models/leadModel');
const agent=require('../models/agentModel');
const FollowupLead=require('../models/followupModel');

const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ErrorHander = require("../utils/errorhander");
const { param } = require('../app');


/// creat followup Lead
exports.Add_Followup_Lead=catchAsyncErrors(async (req,res,next)=>{
    const followuplead = await FollowupLead.create(req.body); 
    res.status(201).json({    
      success: true,  
      message:"lead  Has Been Added Successfully",
      followuplead,  
    });    
})


/// get follow up lead by lead id 

exports.getFollowupById=catchAsyncErrors(async(req,res,next)=>{
        
       const followuplead1=await FollowupLead.find({lead_id:req.params.id}); 
       
       if(!followuplead1){
        return next(new ErrorHander("followuplead not found!...",404));

        
       }else{
        const followuplead = await FollowupLead.aggregate([ 
          {
            $match: {
              $expr: {
                $eq: ["$lead_id", req.params.id ],
              },
            },
          },
      
          {
            $lookup: {
              from: "crm_agents",
              let: { assign_to_agentString: "$assign_to_agent" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", { $toObjectId: "$$assign_to_agentString" }],
                    },
                  },
                },
                {
                  $project: {
                    agent_name: 1,
                  },
                },
              ],
              as: "comment_by",
            },
          },
       ]); 
       
       res.status(201).json({  
        success: true,
        followuplead, 
      }); 

       }
       
             
})




