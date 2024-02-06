// const mongoose=require('mongoose');
// const dotenv=require('dotenv');

// dotenv.config({path:"./config/config.env"});
// const connectDatabase =async(req)=>{
//     let DB_URI;
//   if (req?.headers['x-database-uri'] === 'clickpro.in') {
//     DB_URI= process.env.DB_URI2;
//  }
//  else{ 
//   DB_URI= process.env.DB_URI1;
//  }
//     mongoose.connect(DB_URI,{
//      useNewUrlParser:true,   
//      useUnifiedTopology:true,   
//      serverSelectionTimeoutMS: 30000,
//    }).then((data)=>{
//        console.log(`Mongoosedb connected with server :${data.connection.host}`);
//      }).catch((err)=>{  
//        console.log('not connect',err);
//      })
//  }      


//  module.exports= connectDatabase; 

// dbMiddleware.js

const mongoose = require('mongoose');
const connectToDatabase = async (req, res, next) => {
    try {
        const dbUrl = req.headers['mongodb-url'];
      if (!dbUrl) {
            throw new Error('MongoDB URL not provided in the request headers');
        }
         await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        next(); 
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = connectToDatabase;

  

 