const Lead = require("../models/leadModel");
const agent = require("../models/agentModel");
const FollowupLead = require("../models/followupModel");
const lead_status = require("../models/statusModel");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const { param } = require("../app");
const leadsourceModel = require("../models/leadsourceModel");

/////// Yearly Base Sale Api

exports.YearlySaleApi = catchAsyncErrors(async (req, res, next) => {
  const details = [];
  let TotalAmountWon = 0;
  let TotalAmountLost = 0;
  let TotalAmountwonmanthely = 0;
  const currentDate = new Date();
  const ThirtyDaysAgoDate = new Date();
  ThirtyDaysAgoDate.setDate(ThirtyDaysAgoDate.getDate() - 30);
  const formattedThirtyDaysAgoDate = ThirtyDaysAgoDate.toISOString();
  const wonstatu = await lead_status.find({ status_name: "Won" });
  const loststatu = await lead_status.find({ status_name: "Lost" });
  const wonStatus_id = wonstatu["0"]._id;
  const lostStatus_id = loststatu["0"]._id;
  const wonlead = await Lead.find({ status: wonStatus_id });
  const lostlead = await Lead.find({ status: lostStatus_id });
  ///// for 30 day sale won
  const wonleadforthirtyday = await Lead.find({
    status: wonStatus_id,
    followup_date: { $gte: formattedThirtyDaysAgoDate, $lte: currentDate },
  });
  ///// for 30 day sale won
  const Yearly_lead_count_won = wonlead.length;
  const Yearly_lead_count_Lost = lostlead.length;
  const wonleadforthirtyday_count_lead = wonleadforthirtyday.length;

  wonlead.map((leads) => {
    TotalAmountWon += parseInt(leads.lead_cost);
  });
  lostlead.map((leads) => {
    TotalAmountLost += parseInt(leads.lead_cost);
  });
  wonleadforthirtyday.map((leads) => {
    TotalAmountwonmanthely += parseInt(leads.lead_cost);
  });

  details.push({
    Yearly_lead_count_for_won: Yearly_lead_count_won,
    Yearly_lead_count_Lost: Yearly_lead_count_Lost,
    TotalAmountWon: TotalAmountWon,
    TotalAmountLost: TotalAmountLost,
    wonleadforthirtyday_count_lead: wonleadforthirtyday_count_lead,
    TotalAmountwonmanthely: TotalAmountwonmanthely,
  });

  res.status(201).json({
    success: true,
    message: "Successfully Get Data",
    details,
  });
});

/////  Leads Source Overview  Api

exports.LeadSourceOverviewApi1 = catchAsyncErrors(async (req, res, next) => {
  const Lead_source_id = [];
  const Lead_source_name = [];

  const Lead_source_count = [];
  const lead_source = await leadsourceModel.find();

  lead_source.forEach((lead_source1) => {
    Lead_source_id.push(lead_source1._id);
    Lead_source_name.push(lead_source1.lead_source_name);
  });

  await Promise.all(
    Lead_source_id.map(async (Lead_source_id1) => {
      const lead = await Lead.find({ lead_source: Lead_source_id1 });
      if(lead){
        const lead_length = await lead.length;

        if (!lead_length) {
          Lead_source_count.push(0);
        } else {
          Lead_source_count.push(lead_length);
        }
      }
      
    })
  );

  res.status(201).json({
    success: true,
    message: "Successfully Leads Source Overview",
    Lead_source_count,
    Lead_source_name,
    Lead_source_id,
  });
});




////
exports.LeadSourceOverviewApi = catchAsyncErrors(async (req, res, next) => {
  try {
    const lead_source = await leadsourceModel.find();
    
    const Lead_source_id = lead_source.map((lead_source1) => lead_source1._id);
    const Lead_source_name = lead_source.map((lead_source1) => lead_source1.lead_source_name);

    const Lead_source_countPromises = Lead_source_id.map(async (Lead_source_id1) => {
      const lead = await Lead.find({ lead_source: Lead_source_id1 });
      const lead_length = lead.length;

      return lead_length;
    });

    const Lead_source_count = await Promise.all(Lead_source_countPromises);

    res.status(201).json({
      success: true,
      message: "Successfully Leads Source Overview",
      Lead_source_count,
      Lead_source_name,
      Lead_source_id,
    });
  } catch (error) {
    // Handle errors appropriately
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});





//// Income Graph Overview

exports.IncomeGraphOverview = catchAsyncErrors(async (req, res, next) => {
  const wonstatu = await lead_status.find({ status_name: "Won" });
  const wonStatus_id = wonstatu["0"]._id;
  const monthlyIncom = [];
 ////// for jan
  let total1 = 0;
  const lead1 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        1, // November
      ],
    },
  });
  lead1.map((lead11) => {
    total1 += parseInt(lead11.lead_cost);
  });
  monthlyIncom.push(total1);
  //// for fav
  let total12 = 0;
  const lead2 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        2, // November
      ],
    },
  });
  lead2.map((lead22) => {
    total12 += parseInt(lead22.lead_cost);
  });
  monthlyIncom.push(total12);

  /// mar
  let total13 = 0;
  const lead3 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        3,
      ],
    },
  });
  lead3.map((lead33) => {
    total13 += parseInt(lead33.lead_cost);
  });
  monthlyIncom.push(total13);

  /// apirl
  let total14 = 0;
  const lead4 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        4, // November
      ],
    },
  });
  lead4.map((lead44) => {
    total14 += parseInt(lead44.lead_cost);
  });
  monthlyIncom.push(total14);

  ////// may

  let total15 = 0;
  const lead5 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        5, // November
      ],
    },
  });
  lead5.map((lead55) => {
    total15 += parseInt(lead55.lead_cost);
  });
  monthlyIncom.push(total15);
  // june

  let total16 = 0;
  const lead6 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        6, // November
      ],
    },
  });
  lead6.map((lead66) => {
    total16 += parseInt(lead66.lead_cost);
  });
  monthlyIncom.push(total16);

  //// july
  let total17 = 0;
  const lead7 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        7, // November
      ],
    },
  });
  lead7.map((lead77) => {
    total17 += parseInt(lead77.lead_cost);
  });
  monthlyIncom.push(total17);

  // august
  let total18 = 0;
  const lead8 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        8, // November
      ],
    },
  });
  lead8.map((lead88) => {
    total18 += parseInt(lead88.lead_cost);
  });
  monthlyIncom.push(total18);
  /// setember

  let total19 = 0;
  const lead9 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        9, // November
      ],
    },
  });
  lead9.map((lead99) => {
    total19 += parseInt(lead99.lead_cost);
  });
  monthlyIncom.push(total19);
  //octuber
  let total110 = 0;
  const lead10 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        10, // November
      ],
    },
  });
  lead10.map((lead1010) => {
    total110 += parseInt(lead1010.lead_cost);
  });
  monthlyIncom.push(total110);
  /// nomber
  let total111 = 0;
  const lead111 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        11, // November
      ],
    },
  });
  lead111.map((lead1111) => {
    total111 += parseInt(lead1111.lead_cost);
  });
  monthlyIncom.push(total111);
  /// december

  let total1112 = 0;
  const lead1112 = await Lead.find({
    status: wonStatus_id,
    $expr: {
      $eq: [
        { $month: "$followup_date" }, // Replace 'yourDateField' with the actual field name
        12, // November
      ],
    },
  });
  lead1112.map((lead11112) => {
    total1112 += parseInt(lead11112.lead_cost);
  });
  monthlyIncom.push(total1112);

  res.status(201).json({
    success: true,
    message: "Successfully Leads Source Overview",
    monthlyIncom,
  });
});

exports.GetCalandarData=catchAsyncErrors(async(req,res,next)=>{
              const  lead=await Lead.find({
                add_to_calender:'yes'
              }) ;
   
              res.status(201).json({
                success: true,
                message: "Successfully Get Calandar Data",
                lead,
              });
});