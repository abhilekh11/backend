const express=require('express');
const { YearlySaleApi  } = require('../controllers/genralApiController');


const router=express.Router();

router.route("/YearlySaleApi").get(YearlySaleApi);

module.exports=router;     