const mongoose=require('mongoose');
const validater=require('validator');


const agentSchema= new mongoose.Schema({
         
    agent_name:{
        type:String,
        required:[true,"Please Enter Agent Name"],
        trim:true
    },  
    agent_email:{
        type:String,  
       required:[true,"Please Enter agent_email"],  
        unique:true,  
       // validate:[validator.isEmail,"plz enter a valid email"] 
    },   
    agent_mobile:{             
        type:String,       
        //required:[true,"Please Enter Agent Mobile"],     
        unique:true,  
       // validate:[validator.isMobilePhone,"plz enter a valid Mobile"]  
    },
    agent_password:{ 
        type:String,
      //  required:[true,"Please Enter Your password"],
        minLength:[6,"minimum 6 charactor take of pass"],
        select:false    
      } 
      

     
})


module.exports=mongoose.model("crm_agent",agentSchema);
