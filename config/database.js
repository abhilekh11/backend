const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" });

const connectToDatabase = async (req, res, next) => {
    try {
        const mongodbUrl = req?.headers['mongodb-url']?.trim();
        if (!mongodbUrl) {
           console.log('No MongoDB URL provided in request headers');
            return res.status(400).send('No MongoDB URL provided in request headers');
        }

        // Disconnect if already connected
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect(); 
        }

        // Connect to MongoDB
        await mongoose.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = connectToDatabase;
