const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config({path:"./config/config.env"});
const connectDatabase =()=>{
   
    mongoose.connect(process.env.DB_URI1,{
     useNewUrlParser:true,   
     useUnifiedTopology:true,  
   }).then((data)=>{
       console.log(`Mongoosedb connected with server :${data.connection.host}`);
     }).catch((err)=>{  
       console.log('not connect');
     })
 }   

 module.exports= connectDatabase; 
  
     