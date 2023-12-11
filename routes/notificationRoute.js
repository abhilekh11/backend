const express=require('express');

const { updateandsavenotification } =require('../controllers/notificationController');

const router=express.Router();

router.route('/update_and_save_notification').post(updateandsavenotification);
  
module.exports=router;   