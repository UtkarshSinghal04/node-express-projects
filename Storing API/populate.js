//here we again need to connect to our database 
require('dotenv').config()

const connectdb = require('./db/connect');
//we will also need product schema here 
const Product = require('./models/product');
const jsonproduct = require('./products_list.json');

const start = async () => {
    try {
        await connectdb(process.env.MONGO_URL)
        await Product.deleteMany(); // this will reset ur database to empty
        await Product.create(jsonproduct); // this will add our array of products dynamically
        console.log("success")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()