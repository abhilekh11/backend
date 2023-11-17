const Lead = require("../models/leadModel");
const agent = require("../models/agentModel");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
//const useragent = require('useragent');
const useragent = require('express-useragent');
//const geoip = require('geoip-lite');
/// creat Lead
exports.Add_Lead = catchAsyncErrors(async (req, res, next) => {
  const lead = await Lead.create(req.body);

  res.status(201).json({
    success: true,
    message: "lead  Has Been Added Successfully",
    lead,
  });
});

//// get All Lead
exports.getAllLead = catchAsyncErrors(async (req, res, next) => {
  const lead = await Lead.aggregate([
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
        as: "agent_details",
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
                $eq: ["$_id", { $toObjectId: "$$serviceString" }],
              },
            },
          },
          {
            $project: {
              product_service_name: 1,
            },
          },
        ],
        as: "service_details",
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
                $eq: ["$_id", { $toObjectId: "$$statusString" }],
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

    {
      $lookup: {
        from: "crm_lead_sources",
        let: { lead_sourceString: "$lead_source" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", { $toObjectId: "$$lead_sourceString" }],
              },
            },
          },
          {
            $project: {
              lead_source_name: 1,
            },
          },
        ],
        as: "lead_source_details",
      },
    },
  ]);

 

 
  
  
  res.status(200).json({
    success: true,
   
    lead,  
      
  });
});


/// get  lead by by agent id for user

exports.getLeadbyagentidandstatus=catchAsyncErrors(async (req,res,next)=>{
   const {assign_to_agent} =req.body; 
  if(!assign_to_agent){
      return next(new ErrorHander("assign_to_agent is required..!",404)); 
   }
   const lead = await Lead.aggregate([
      { 
        $match: {
          $expr: {
            $eq: ["$assign_to_agent",  assign_to_agent ],
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
          as: "agent_details",
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
                  $eq: ["$_id", { $toObjectId: "$$serviceString" }],
                },
              },
            },
            {
              $project: {
                product_service_name: 1,
              },
            },
          ],
          as: "service_details",
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
                  $eq: ["$_id", { $toObjectId: "$$statusString" }],
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
  
      {
        $lookup: {
          from: "crm_lead_sources",
          let: { lead_sourceString: "$lead_source" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$lead_sourceString" }],
                },
              },
            },
            {
              $project: {
                lead_source_name: 1,
              },
            },
          ],
          as: "lead_source_details",
        },
      },
    ]);
  
    res.status(200).json({
      success: true,
     
      lead,
    });
 
    


})



//// get Lead By Id

exports.getLeadById = catchAsyncErrors(async (req, res, next) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return next(new ErrorHander("lead is not found"));
  } else {
    const leads = await Lead.aggregate([ 
      {
        $match: {
          $expr: {
            $eq: ["$_id", { $toObjectId: req.params.id }],
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
          as: "agent_details",
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
                  $eq: ["$_id", { $toObjectId: "$$serviceString" }],
                },
              },
            },
            {
              $project: {
                product_service_name: 1,
              },
            },
          ],
          as: "service_details",
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
                  $eq: ["$_id", { $toObjectId: "$$statusString" }],
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

      {
        $lookup: {
          from: "crm_lead_sources",
          let: { lead_sourceString: "$lead_source" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$lead_sourceString" }],
                },
              },
            },
            {
              $project: {
                lead_source_name: 1,
              },
            },
          ],
          as: "lead_source_details",
        },
      },
    ]);

    res.status(200).json({
      success: true,
      leads,
    });
  }
});


/// delete all lead 

exports.deleteAllLead=catchAsyncErrors(async(req,res,next)=>{
 await Lead.deleteMany();
  res.status(200).json({
    success: true,
    message:"Delete All Lead Successfully",
  });
   

})

