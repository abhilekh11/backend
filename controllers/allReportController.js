const Lead_Source=require('../models/leadsourceModel');
const catchAsyncErrors=require('../middleware/catchAsyncErrors');
const ErrorHander = require("../utils/errorhander");
const Lead=require('../models/leadModel');
const Product=require('../models/productserviceModel');



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
 let  total=0;
      leadSource.map((hhhhh)=>{
        if(hhhhh?.lead_cost){
          total+=parseInt(hhhhh.lead_cost);
        }
         
      })

     let addd={
      full_name: "Total",
      lead_cost:total
     }
     await leadSource.push(addd)



  res.status(201).json({
    success: true,
    message:'Lead Source Get Successfully',
    leadSource,
  });


})


//////// Product And Service Report By Default Graph

exports.LeadProductServiceOverviewApi = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.find();
    
    const product1_id = product.map((product1) => product1._id);
    const product_name = product.map((product2) => product2.product_service_name);

    const product_countPromises = product1_id.map(async (product1_id1) => {
      const lead = await Lead.find({ service: product1_id1 });
      const lead_length = lead.length;

      return lead_length;
    });

    const product_count = await Promise.all(product_countPromises);

    res.status(201).json({
      success: true,
      message: "Successfully Leads Source Overview",
      product_count,
      product_name,
      product1_id,
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


//////// Product And Service Report Date Wise Filter in Table

exports.GetProductReportDateWise=catchAsyncErrors(async (req,res,next)=>{
  const { product_service_id, start_date, end_date } = req.body;
  if (!product_service_id) {
    return next(new ErrorHander("Product Service is required", 400));
  }
 
  
// Parse start_date and end_date into Date objects if provided
const startDateObj = start_date ? new Date(start_date) : null;
const endDateObj = end_date ? new Date(end_date) : null;

const query = {
  service: product_service_id,
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

const leadSource = await Lead.find(query).select("full_name followup_won_amount").maxTimeMS(30000);
 if (!leadSource || leadSource.length === 0) {
    return next(new ErrorHander("No Data Found Now", 404));
  }
let  total=0;
  leadSource.map((hhhhh)=>{
    if(hhhhh?.followup_won_amount){
      total+=parseInt(hhhhh.followup_won_amount);
    }
     
  })

 let addd={
  full_name: "Total",
  followup_won_amount:total
 }
 await leadSource.push(addd)



res.status(201).json({
success: true,
message:'Lead Source Get Successfully',
leadSource,
});


})
