const express=require('express');
const { Add_Lead } = require('../controllers/leadController');


const router=express.Router();
router.route("/add_lead").post(Add_Lead);

module.exports=router;   