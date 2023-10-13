const Agent=require('../models/agentModel');
const ErrorHander = require("../utils/errorhander");
// creat agent
exports.createAgent= (async (req,res,next) => {
   
    //const {agent_name,agent_email} =req.body;

    const agent=await Agent.create(req.body); 
   
     //console.log(agent);
     
    res.status(201).json({ 
        success: true,     
        agent,
       })  
});


// get all agent

exports.getAllAgent= (async (req,res,next) => {
   
    const agent=await Agent.find(); 
   
    res.status(201).json({ 
        success: true,               
        agent, 
       })  
});

// get Agent  details

exports.getAgentDetails= (async (req,res,next) => {
   
    const agent=await Agent.findById(req.params.id); 
     
    if(!agent){
           
           return next(new ErrorHander("Agent Not Found", 404));  
    } 

     
    res.status(201).json({ 
        success: true,    
        agent, 
       })  
});
