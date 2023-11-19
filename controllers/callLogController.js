const Lead_Source = require("../models/leadsourceModel");
const CallLog = require("../models/callLogModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const moment = require('moment');
///  add call log
exports.Add_CallLog = catchAsyncErrors(async (req, res, next) => {
  const { datetime, user_id } = req.body;
  const datetimeDate = new Date(datetime);
  const formattedDate = moment(datetimeDate).format('YYYY-MM-DD');
  
  const call_log = await CallLog.find({ datetime,user_id });

  if (call_log.length === 0) {
    const calllog = await CallLog.create(
      {
        ...req.body,
        calldate:formattedDate,
      }
    );

    res.status(201).json({
      success: true,
      message: "CallLog Has Been Added Successfully",
      calllog,
    });
  } else {
    res.status(201).json({
      success: true,
      message: "CallLog Already Added",
    });
  }
});

//// get call log by user id
exports.getCallLogById = catchAsyncErrors(async (req, res, next) => {
  const call_log = await CallLog.find({ user_id: req.params.id })
    .sort({ datetime: -1 })
    .exec();
  if (!call_log) {
    return next(new ErrorHander("This id is Not Found", 404));
  }
  res.status(201).json({
    success: true,
    call_log,
  });
});
///// get call log by user_id and date wise
exports.getCallLogByIdAndDate = catchAsyncErrors(async (req, res, next) => {
  const { user_id, start_date, end_date } = req.body;
 
  
  console.log(startDate);
  const call_log = await CallLog.find({  
    user_id: user_id,
    datetime: {
      $gte: start_date,
      $lte: end_date,
    },
  }).maxTimeMS(30000);

  if (!call_log) {
    return next(new ErrorHander("This id is Not Found", 404));
  }
  


  res.status(201).json({
    success: true,
   
   
    call_log, 
  });
});



/// delete all calll log

exports.deleteAllCallLog=catchAsyncErrors(async(req,res,next)=>{
  await CallLog.deleteMany();
   res.status(200).json({
     success: true,
     message:"Delete All CallLog Successfully",
   });
    
 
 })
