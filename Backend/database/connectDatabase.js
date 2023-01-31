const mongoose = require('mongoose');
mongoose.set('strictQuery', true);


const connectDatabase = async () => {
    try {
        console.log("Connection to database auth-example started...");
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/auth-example');
        console.log("Connection established");
        return db;
    } catch (err) {
        console.log(err.message);
        return (err.message);
    }
}

module.exports = connectDatabase;