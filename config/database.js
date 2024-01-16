const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config({path:"./config/config.env"});
const url='mongodb+srv://main_crm:G23LYJMUGDGCIKEs@cluster0.e2eklhp.mongodb.net/maincrm?retryWrites=true&w=majority';
const connectDatabase =()=>{
   
    mongoose.connect(url,{
     useNewUrlParser:true,   
     useUnifiedTopology:true,  
   }).then((data)=>{
       console.log(`Mongoosedb connected with server :${data.connection.host}`);
     }).catch((err)=>{  
       console.log('not connect');
     })
 }   

 module.exports= connectDatabase; 
  
     