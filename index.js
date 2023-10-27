const app = require('./app');
const connectDatabase=require("./config/database"); 


// handing uncaught  error 
  
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log(`shutting down the server due to handing uncaught  error `);
    Server.exit(1);
})    
connectDatabase();  
  



app.listen(process.env.PORT,()=>{
    console.log(`server  is working on http://localhost:${process.env.PORT}`)     ;    
}) 
    

  
//  unhandled promise rejection 
process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`)
    console.log(`shutting down the server due to unhandled promise rejectio `);
    Server.exit(1);
})       