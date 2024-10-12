const mongoose = require('mongoose');
//we don't want anyone to see our connection string that's why we will use .env files

const connectDB = (url) => {
    //returning the promise 
    return mongoose.connect(url)
}

console.log("this is connect from db");
module.exports = connectDB;