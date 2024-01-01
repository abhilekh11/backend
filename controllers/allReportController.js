const Lead_Source=require('../models/leadsourceModel');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ErrorHander = require("../utils/errorhander");
const Lead=require('../models/leadModel');



/////// leadsource report 
exports.LeadSourceReport=catchAsyncErrors(async (req,res,next)=>{
   const { leadsource_id, start_date, end_date } = req.body;
      if (!leadsource_id) {
        return next(new ErrorHander("Lead source is required", 400));
      }
     
    
 // Parse start_date and end_date into Date objects if provided
 const startDateObj = start_date ? new Date(start_date) : null;
 const endDateObj = end_date ? new Date(end_date) : null;

 const query = {
    lead_source: leadsource_id,
  };

  if (startDateObj && !isNaN(startDateObj)) {
    query.created = {
      $gte: startDateObj,
    };
  }

  if (endDateObj && !isNaN(endDateObj)) {
    // If query.created already exists, add $lte to it, otherwise, create a new object
    query.created = query.created || {};
    query.created.$lte = endDateObj;
  }

 const leadSource = await Lead.find(query).select("full_name lead_cost").maxTimeMS(30000);
     if (!leadSource || leadSource.length === 0) {
        return next(new ErrorHander("No Data Found Now", 404));
      }
  res.status(201).json({
    success: true,
    message:'Lead Source Get Successfully',
    leadSource,
  });


})


