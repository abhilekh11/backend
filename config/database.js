const mongoose=require('mongoose');
const dotenv=require('dotenv');
  const Country=require('country-state-city').Country;
  const State=require('country-state-city').State;
  const City=require('country-state-city').City;
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
  
 