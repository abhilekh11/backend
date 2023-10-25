  const Country=require('country-state-city').Country;
  const State=require('country-state-city').State;
  // const City=require('country-state-city').City;
   
 
  const con=require('../models/countryModel');
  const stat=require('../models/stateModel');   

var countries=Country.getAllCountries();
var state=State.getAllStates();

countries.forEach(conn=>{  
  //con.insertMany({ name:conn.name,short_name:conn.isoCode});     
})

state.forEach(state1=>{     
  //stat.insertMany({ name:state1.name,country_short_name:state1.countryCode});     
})


  

 
      
