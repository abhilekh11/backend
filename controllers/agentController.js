const Agent = require("../models/agentModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// creat agent  -- admin
exports.createAgent = catchAsyncErrors(async (req, res, next) => {
  //const {agent_name,agent_email} =req.body;

  const agent = await Agent.create(req.body);

  res.status(201).json({
    success: true,
    agent,
  });

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
  });
});

// get all agent --admin

exports.getAllAgent = catchAsyncErrors(async (req, res, next) => {
  const agent = await Agent.find();

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
  const token = agent.getJWTToken();

  sendToken(agent, 200, res);
});
