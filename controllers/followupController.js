const Lead=require('../models/leadModel');
const agent=require('../models/agentModel');
const FollowupLead=require('../models/followupModel');

const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ErrorHander = require("../utils/errorhander");
const { param } = require('../app');


/// creat followup Lead
exports.Add_Followup_Lead=catchAsyncErrors(async (req,res,next)=>{
    const followuplead1 = await FollowupLead.create(req.body);
    const lastInsertedId = followuplead1._id;
   
   
    const followuplead = await FollowupLead.aggregate([ 
      {        
        $match: {
          $expr: {  
            $eq: ["$_id", lastInsertedId ],
          },
        },  
      },
  
      {
        $lookup: {
          from: "crm_agents",
          let: { commented_byString: "$commented_by" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$commented_byString" }],
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
       
      {
        $lookup: {
          from: "crm_statuses",
          let: { followup_status_idString: "$followup_status_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$followup_status_idString" }],
                },
              },
            },
            {
              $project: {
                status_name: 1,
              },
            },
          ],
          as: "status_details",
        },
      },


   ]); 


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
              let: { commented_byString: "$commented_by" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", { $toObjectId: "$$commented_byString" }],
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
           
          {
            $lookup: {
              from: "crm_statuses",
              let: { followup_status_idString: "$followup_status_id" },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: ["$_id", { $toObjectId: "$$followup_status_idString" }],
                    },
                  },
                },
                {
                  $project: {
                    status_name: 1,
                  },
                },
              ],
              as: "status_details",
            },
          },


       ]); 
           if(followuplead){ 
        const lead = await Lead.findById(req.params.id);
        const updatedData = {assign_to_agent:lead.assign_to_agent};

        const leads=await Lead.findByIdAndUpdate(req.params.id,updatedData,{   
          new:true,    
          runValidators:true,    
          useFindAndModify:false,
          })   
           
  
       }

       res.status(201).json({  
        success: true,
        followuplead, 
      }); 

       }
       
             
})


///

exports.getAllfollowbyidstatus=catchAsyncErrors(async (req,res,next)=>{ 
      
     
        
         
        
           
})


//// 






