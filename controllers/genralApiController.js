
const Lead = require("../models/leadModel");
const agent = require("../models/agentModel");
const FollowupLead = require("../models/followupModel");
const lead_status=require("../models/statusModel");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const { param } = require("../app");


/////// Yearly Base Sale Api 

exports.YearlySaleApi=catchAsyncErrors(async(req,res,next)=>{
    const details = [];
    let  TotalAmountWon=0;
    let  TotalAmountLost=0;
    let  TotalAmountwonmanthely=0;


    const currentDate = new Date();
    // const thirtyDaysAgo = new Date();
    // thirtyDaysAgo.setDate(currentDate.getDate() - 30);
    // const CurrentDate=currentDate.toISOString().split('T')[0];
    // const ThirthyDayAgoDate=thirtyDaysAgo.toISOString().split('T')[0];

    const ThirtyDaysAgoDate = new Date();
ThirtyDaysAgoDate.setDate(ThirtyDaysAgoDate.getDate() - 30);
const formattedThirtyDaysAgoDate = ThirtyDaysAgoDate.toISOString();

   


    const wonstatu= await lead_status.find({status_name:"Won"});
    const loststatu= await lead_status.find({status_name:"Lost"});
    

   

    const wonStatus_id=wonstatu['0']._id;
    const lostStatus_id=loststatu['0']._id;
    const wonlead=await Lead.find({status:wonStatus_id,});
    const lostlead=await Lead.find({status:lostStatus_id,});

    ///// for 30 day sale won
    const wonleadforthirtyday=await Lead.find({
        status:wonStatus_id,
        followup_date: { $gte: formattedThirtyDaysAgoDate, $lte: currentDate },
    });
    ///// for 30 day sale won


    const Yearly_lead_count_won=wonlead.length;
    const Yearly_lead_count_Lost=lostlead.length;
    const wonleadforthirtyday_count_lead=wonleadforthirtyday.length;

    wonlead.map((leads)=>{
        TotalAmountWon +=parseInt(leads.lead_cost);
    })
    lostlead.map((leads)=>{
        TotalAmountLost +=parseInt(leads.lead_cost);
    })
    wonleadforthirtyday.map((leads)=>{
        TotalAmountwonmanthely +=parseInt(leads.lead_cost);
    })

   details.push({
        Yearly_lead_count_for_won:Yearly_lead_count_won,
        Yearly_lead_count_Lost:Yearly_lead_count_Lost,
        TotalAmountWon:TotalAmountWon,
        TotalAmountLost:TotalAmountLost,
        wonleadforthirtyday_count_lead:wonleadforthirtyday_count_lead,
        TotalAmountwonmanthely:TotalAmountwonmanthely,

    })


   res.status(201).json({
        success: true,
        message: "Successfully Get Data",
        details,
      });
});
