const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({  
  group_id: {
    type: Number,
    default: 1,
    trim: true,
  },  
  full_name: { 
    type: String,
    required: true,
    trim: true,
  },
  email_id: {
    type: String,
    // required: true,
    trim: true,
  },  
  contact_no: {
    type: Number,
    required: true,
    trim: true,
  },
  alternative_no: {
    type: Number,
    trim: true,
  },
  company_name: {
    type: String, 
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
    trim: true,
  },
  service: {   
    type: String,
    //required: true,
    trim: true,
  },
  lead_cost: {
    type: String,
    trim: true,
  },
  followup_won_amount: {
    type: Number,
    trim: true,
  },
  lead_source: {
    type: String,
    //required:true,
    trim: true,
  },
  full_address: {
    type: String,
    trim: true,
  },  
  country: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  pincode: {
    type: Number,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    trim: true,
  },
  logistics_status: {
    type: Number,
    trim: true,
  },
  assign_to_agent: {
    type: String,
    // required:true,
    trim: true,
  },
  property_stage: {
    type: String,
    trim: true,
  },
  assistant_name: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  deleted: {
    type: Date,
  },
  client_id: {
    type: String,
    trim: true,
  },
  followup_date: {
    type: Date,
  },
  forword_agent_id: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("crm_lead", leadSchema);
