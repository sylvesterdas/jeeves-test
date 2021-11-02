const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

exports.connect = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        });
        console.log('Successfully connected to database');
    } catch (error) {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
    }
};