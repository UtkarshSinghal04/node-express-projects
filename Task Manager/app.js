const express = require('express');
const app = express();
const port = 3000;
const connectDB = require('./DB/connection')
require('dotenv').config();
const tasks = require('./routes/tasks');

const start = async () => {
    try {
        await connectDB(process.env.Mongo_URL);
        app.listen(port, console.log(`server is listening on ${port}...`))
    }
    catch (err) {
        console.log(err);
    }
}

start();

//middleware

// without this , we don't get any data in req.body
app.use(express.json());

//router
app.use('/api/v1/tasks', tasks);