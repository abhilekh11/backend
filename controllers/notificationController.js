const Notification = require("../models/notificationModel");
const webNotification=require("../models/notificationForWebModel")
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Agent = require("../models/agentModel");

// save and update device token  for app

exports.updateandsavenotification = catchAsyncErrors(async (req, res, next) => {
  const { user_id, token } = req.body;
  if (!user_id) {
    return next(new ErrorHander("User is Required", 400));
  }        
  if (!token) {
    return next(new ErrorHander("Device Token is Required", 400));
  }
  const agent = await Notification.find({ user_id: user_id });
  if (agent.length==0) {
    
    ////  then save the token in notification collection
    const notification = await Notification.create(req.body);
   return  res.status(201).json({  
      success: true,
      notification,
    });
  }else{
   //// update the token in notification collection
  const condition = { user_id: user_id }; 
  const updatedate={    
   token:token,
  }
 const notificationupdate=await Notification.updateOne(condition, updatedate);    
  res.status(201).json({
   success: true,
   massage:'Token Update Successfully...',    
 });
}
  

});



// save and update device token  for web
exports.updateandsavenotificationForWeb = catchAsyncErrors(async (req, res, next) => {
  const { user_id, token } = req.body;
  if (!user_id) {
    return next(new ErrorHander("User is Required", 400));
  }
  if (!token) {
    return next(new ErrorHander("Device Token is Required", 400));
  }
  const agent = await webNotification.find({ user_id: user_id });
  if (agent.length==0) {
    
    ////  then save the token in notification collection
    const notification = await webNotification.create(req.body);
   return  res.status(201).json({  
      success: true,
      notification,
    });
  }else{
   //// update the token in notification collection
  const condition = { user_id: user_id }; 
  const updatedate={      
   token:token,
  }
 const notificationupdate=await webNotification.updateOne(condition, updatedate);    
  res.status(201).json({
   success: true,
   massage:'Token Update Successfully...',    
 });
  
} 

});
