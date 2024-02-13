const TransactionalSMSModel = require('../models/transactionalSMSModel');
const WhatappSMSModel=require('../models/whatappbulkSMSModel');
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.addandupdatetransactionalsms = catchAsyncErrors(async (req, res, next) => {
    const transactionalSMSModel = await TransactionalSMSModel.find();
    if (transactionalSMSModel.length === 0) {
        const transactional = await TransactionalSMSModel.create(req.body);
        res.status(200).json({
            success: true,
            transactional,
            message: 'Transactional SMS Record Added Successfully',
        });
    } else {
        const filter = {}; // Empty filter to update all records
        const update = req.body;
        const transactional = await TransactionalSMSModel.findOneAndUpdate(filter, update);
        res.status(200).json({
            success: true,
            transactional,
            message: 'Transactional SMS Record Updated Successfully',
        });
    }
});
exports.addandupdatewhatappsms = catchAsyncErrors(async (req, res, next) => {
    const whatappSMSModel = await WhatappSMSModel.find();
    if (whatappSMSModel.length === 0) {
        const whatapp = await WhatappSMSModel.create(req.body);
        res.status(200).json({
            success: true,
            whatapp,
            message: 'whatapp SMS Record Added Successfully',
        });
    } else {
        const filter = {}; // Empty filter to update all records
        const update = req.body;
        const whatapp = await WhatappSMSModel.findOneAndUpdate(filter, update);
        res.status(200).json({
            success: true,
            whatapp,
            message: 'whatapp SMS Record Updated Successfully',
        });
    }
});


exports.getallsmsrecord=catchAsyncErrors(async (req,res,next)=>{
    const transactional=await TransactionalSMSModel.find();
    res.status(200).json({
        success: true,
        transactional,
    });
});
exports.getallwhatsmsrecord=catchAsyncErrors(async (req,res,next)=>{
    const whatappSMSModel=await WhatappSMSModel.find();
    res.status(200).json({
        success: true,
        whatappSMSModel,
    });
});
