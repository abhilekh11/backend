const express=require('express');
const  excel=express();
const multer = require('multer');
const path=require('path');

// const bodypParser=require('body-parser');

// excel.use(bodypParser.urlencoded({extended:true}));

excel.use(express.static(path.resolve(__dirname,'public')));

var storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.resolve(__dirname, 'public', 'uplodes'));     
    },
    filename:(req,file,cb)=>{
        console.log('Original file name:', file.originalname);
        cb(null,file.originalname)
    }
})

var  upload=multer({storage:storage});    
const  excelController=require('../controllers/excelUplode'); 

excel.post('/api/v1/import',upload.single('file'),excelController.ExcelUplode);     

module.exports=excel;

