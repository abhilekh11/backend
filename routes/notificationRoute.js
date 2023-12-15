const express=require('express');

const { updateandsavenotification, updateandsavenotificationForWeb } =require('../controllers/notificationController');

const router=express.Router();
   
router.route('/update_and_save_notification').post(updateandsavenotification);
router.route('/update_and_save_notification_for_web').post(updateandsavenotificationForWeb);

module.exports=router;   