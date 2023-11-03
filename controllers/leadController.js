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
            },
            {
              $project: {
                agent_name: 1, 
              }
            }
          ],
          as: "agent_details"
        },
          },

          {
            $lookup: {
              from: "crm_product_services",
              let: { serviceString: "$service" },
              pipeline: [
                {
                  $match: { 
                    $expr: {
                      $eq: [ "$_id", { $toObjectId: "$$serviceString" } ]
                    }
                  }
                },
                {
                  $project: {
                    product_service_name: 1, 
                  }
                }
              ],
              as: "service_details"
            },
              },

              {
                $lookup: {
                  from: "crm_statuses",
                  let: { statusString: "$status" },
                  pipeline: [
                    {
                      $match: { 
                        $expr: {
                          $eq: [ "$_id", { $toObjectId: "$$statusString" } ]
                        }
                      }
                    },  
                    {
                      $project: {
                        status_name: 1, 
                      }
                    }
                  ],
                  as: "status_details"
                },
                  },

                  {
                    $lookup: {
                      from: "crm_lead_sources",
                      let: { lead_sourceString: "$lead_source" },
                      pipeline: [
                        {
                          $match: { 
                            $expr: {
                              $eq: [ "$_id", { $toObjectId: "$$lead_sourceString" } ]
                            }
                          }
                        },  
                        {
                          $project: {
                            lead_source_name: 1, 
                          }
                        }
                      ],
                      as: "lead_source_details"
                    },
                      },

    ]);
    
    res.status(200).json({
      success:true,    
      lead   
    })
});


//// 
