const express=require('express');
const { Add_Lead, getAllLead } = require('../controllers/leadController');


const router=express.Router();
router.route("/add_lead").post(Add_Lead);
router.route("/get_all_lead").get(getAllLead);

module.exports=router;     