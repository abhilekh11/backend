const Agent = require("../models/agentModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const LoginHistory=require("../models/LoginHistory");
const useragent = require('useragent');
const geoip = require('geoip-lite');
// creat agent  -- admin
exports.createAgent = catchAsyncErrors(async (req, res, next) => {
  //const {agent_mobile,agent_email} =req.body;

  //console.log(agent_email);
  // const agent=await Agent.find({agent_mobile});
  
  // if(!agent){
const agent = await Agent.create(req.body);

res.status(201).json({
  success: true,
  agent,
  message:"Agent Added Successfully...."
});  
  // }else{
  //   res.status(202).json({
  //     success: false,
  //     message:"Email Or Mobile Already Exit..."
  //   });
  // }

  

  //sendToken(agent,201,res);
});

// Delete Agent --admin

exports.deleteAgent = catchAsyncErrors(async (req, res, next) => {
  const agent = await Agent.findById(req.params.id);

  if (!agent) {
    return next(new ErrorHander("Agent Not Found", 404));
  }
  await agent.deleteOne();

  res.status(200).json({
    success: true,
    message: "Agent Delete Successfully",
    agent,
  });
});

// get all agent --admin

exports.getAllAgent = catchAsyncErrors(async (req, res, next) => {
  
  const agent = await Agent.find({role:"user"});
  

  res.status(201).json({
    success: true,
    agent, 
    
  });
});     


// get Agent  details

exports.getAgentDetails = catchAsyncErrors(async (req, res, next) => {
  
  const agent = await Agent.findById(req.params.id);

  if (!agent) {
    return next(new ErrorHander("Agent Not Found", 404));    
  }
  
  res.status(201).json({
    success: true,
    agent,
  }); 
});  

// login Agent

exports.loginAgent = catchAsyncErrors(async (req, res, next) => {
  // const {agent_email, agent_password} =req.body;
  const agentsfdsfds = useragent.parse(req.headers['user-agent']);
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  const geo = geoip.lookup(ip);

 
  
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander("Plz Enter Email And Password", 400));
  }
  const agent = await Agent.findOne({ agent_email: email }).select(
    "+agent_password"
  );
  if (!agent) {
    return next(new ErrorHander("Invalid email Or password", 400));
  }
  const isPasswordMatched = await agent.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email Or password", 400));
  }

  const loginHistory1 ={
    userId: 'kjioj',
    ip,
    browser: agentsfdsfds.toString(),
    system: agentsfdsfds.os.toString(),
    location: geo ? `${geo.city}, ${geo.region}, ${geo.country}` : 'Unknown',
  }; 
 
  //  await loginHistory.create(loginHistory1);  
  // loginHistory.save()   
  console.log(agentsfdsfds.toString())
  const token = agent.getJWTToken();
 
  sendToken(agent, 200, res);
});
/// update Client Access
exports.updateClientAccess=catchAsyncErrors(async(req,res,next)=>{
    ///const  {client_access}=req.body;
  const agent = await Agent.findById(req.params.id);
  if(!agent){   
    return next(new ErrorHander("Invalid email Or password", 400));
  }
   
   
  const agent_access=await agent.client_access;
 
  if(agent_access==='yes'){
   const agent=await Agent.updateOne({_id:req.params.id},{$set: {client_access:"no"}});
  }
  if(agent_access==='no'){
    const agent=await Agent.updateOne({_id:req.params.id},{$set: {client_access: "yes"}});
    
  }
  res.status(201).json({
    success: true,
    agent, 
    
  });
  

 
     
       
          
})



