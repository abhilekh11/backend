const express=require('express');
const { addAllSocialMediaLead ,getAllSocialMediaLead} = require('../controllers/facebookController');



const  router=express.Router();

router.route("/webhook").post(addAllSocialMediaLead);   
router.route("/getAllSocialMediaLead").get(getAllSocialMediaLead);   

 

module.exports=router;