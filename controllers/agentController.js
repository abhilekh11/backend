const Agent = require("../models/agentModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors= require('../middleware/catchAsyncErrors');

// creat agent  -- admin
exports.createAgent = catchAsyncErrors(async (req, res, next) => {
  //const {agent_name,agent_email} =req.body;

  const agent = await Agent.create(req.body);

  res.status(201).json({
    success: true,
    agent,
  });
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
