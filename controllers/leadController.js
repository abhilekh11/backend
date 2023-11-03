const Lead=require('../models/leadModel');
const agent=require('../models/agentModel');

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
   // const lead= await Lead.find();


    //    const lead=await Lead.aggregate([{$lookup: 
    //     {
    //       from: 'crm_agents',
    //       localField: '_id',
    //       foreignField: 'assign_to_agent',
    //       as: 'agent_name',  
    //     },   
    // }])

    const lead=await Lead.aggregate([
      {
        $lookup: {
          from: "crm_agents",
          let: { assign_to_agentString: "$assign_to_agent" },
          pipeline: [
            {
              $match: { 
                $expr: {
                  $eq: [ "$_id", { $toObjectId: "$$assign_to_agentString" } ]
                }
              }
            }
          ],
          as: "category"
        }
      },
    ]);
    
    res.status(200).json({
      success:true,    
      lead   
    })
});


//// 
