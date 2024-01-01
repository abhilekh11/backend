const Lead_Source = require("../models/leadsourceModel");
const CallLog = require("../models/callLogModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHander = require("../utils/errorhander");
const moment = require("moment");
const SecondToHoure=require("../utils/secondtohoure")
///  add call log
exports.Add_CallLog = catchAsyncErrors(async (req, res, next) => {
  const { datetime, user_id } = req.body;
  const datetimeDate = new Date(datetime);
  const formattedDate = moment(datetimeDate).format("YYYY-MM-DD");

  const call_log = await CallLog.find({ datetime, user_id });

  if (call_log.length === 0) {
    const calllog = await CallLog.create({
      ...req.body,
      calldate: formattedDate,
    });

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
  const details = [];

  const call_log = await CallLog.find({
    user_id: user_id,
    calldate: {
      $gte: start_date,
      $lte: end_date,
    },
  }).maxTimeMS(30000);

  if (!call_log) {
    return next(new ErrorHander("This id is Not Found", 404));
  }
  let totalDuration = 0;
  let totalIncommingDuration = 0;
  let totalOutgoingDuration = 0;
  let totalCall = 0;
  let totalMissCall = 0;
  let totalIncommingCall = 0;
  let totalOutgoingCall = 0;
  let totalRejectedCall = 0;


  call_log.map((call_logs) => {
    totalDuration += call_logs.duration;
    totalCall += 1;
    if (call_logs.rawtype == 1) {
      totalIncommingDuration += call_logs.duration;
      totalIncommingCall += 1;
    }
    if (call_logs.rawtype == 2) {
      totalOutgoingDuration += call_logs.duration;
      totalOutgoingCall +=1;
    }
    if(call_logs.rawtype == 3){
      totalMissCall +=1;
    }
    if(call_logs.rawtype == 10){
      totalRejectedCall +=1;
    }
  });  
  /// Longest Duration T
  const maxObject = call_log.reduce((max, current) => (current.duration > max.duration ? current : max), call_log[0]);
  /// for total duration
  const thours = Math.floor(totalDuration / 3600);
  const tminutes = Math.floor((totalDuration % 3600) / 60);
  const tremainingSeconds = totalDuration % 60;
  const total_duration =
    thours + "h " + tminutes + "m " + tremainingSeconds + "s";
  /// for incomming duration
  const tihours = Math.floor(totalIncommingDuration / 3600);
  const timinutes = Math.floor((totalIncommingDuration % 3600) / 60);
  const tiremainingSeconds = totalIncommingDuration % 60;
  const tiotal_duration =
    tihours + "h " + timinutes + "m " + tiremainingSeconds + "s";
  //// for outgoing duration
  const tohours = Math.floor(totalOutgoingDuration / 3600);
  const tominutes = Math.floor((totalOutgoingDuration % 3600) / 60);
  const toremainingSeconds = totalOutgoingDuration % 60;
  const tootal_duration =
    tohours + "h " + tominutes + "m " + toremainingSeconds + "s";
   ////  Total Day And Average Duration
   const timeDifference = (new Date(end_date) - new Date(start_date));
   const TotalDays = (timeDifference / (1000 * 60 * 60 * 24))+1;
    const avragedurationinsecond=totalDuration/TotalDays;
    const avragedurationinhoure = Math.floor(avragedurationinsecond / 3600);
    const avragedurationinminutes = Math.floor((avragedurationinsecond % 3600) / 60);
    const avragedurationinSeconds = parseInt(avragedurationinsecond % 60);
    const avrage_duration_per_day =
    avragedurationinhoure + "h " + avragedurationinminutes + "m " + avragedurationinSeconds + "s";
   //////Average Duration per Call
     const avrage_duration_per_call_in_second=totalDuration/totalCall;
     const avrage_duration_per_call=await SecondToHoure(avrage_duration_per_call_in_second);

    /////////total Working  houre Calculate 
    const dailworkingtime=(parseInt(totalCall*30)+parseInt(totalDuration));
    const totalworkinghoure=await SecondToHoure(dailworkingtime);
     /////Top Dialer  
     
     const countMap = new Map();

// Count occurrences of each value and store the corresponding objects
call_log.forEach(obj => {
  const value = obj.phone_number;
  if (!countMap.has(value)) {
    countMap.set(value, []);
  }
  countMap.get(value).push(obj);
});

// Find the most frequent value and its corresponding objects 
let mostFrequentDialer;
let mostFrequentDialerName ;
let maxCountDial = 0;

countMap.forEach((objects, value) => {
  const count = objects.length;
  if (count > maxCountDial) {
    mostFrequentDialer = value;
    mostFrequentDialerName = objects[0].name;
    maxCountDial = count;
  }
});
  details.push({
    totalDuration: total_duration,
    totalworkinghoure:totalworkinghoure,  
    totalIncommingDuration: tiotal_duration,
    totalOutgoingDuration: tootal_duration,
    totalCall: totalCall,
    totalIncommingCall: totalIncommingCall,
    totalOutgoingCall:totalOutgoingCall,
    totalMissCall:totalMissCall,
    totalRejectedCall:totalRejectedCall,
    TotalDays:TotalDays,
    avrage_duration_per_day:avrage_duration_per_day,
    avrage_duration_per_call:avrage_duration_per_call,
    mostFrequentDialer:mostFrequentDialer,
    mostFrequentDialerName:mostFrequentDialerName,
    maxCountDial:maxCountDial,
    Longest_talk:maxObject
  });   

  res.status(201).json({
    success: true,
    details,
  });
});

/// delete all calll log

exports.deleteAllCallLog = catchAsyncErrors(async (req, res, next) => {
  await CallLog.deleteMany();
  res.status(200).json({
    success: true,
    message: "Delete All CallLog Successfully",
  });
});
