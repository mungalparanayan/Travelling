require("dotenv").config();
const mongoose = require('mongoose');

const mongoURI = process.env.mongoURI;

const connectToMongo = ()=> {
    mongoose.connect(mongoURI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB Successfully');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
}

module.exports = connectToMongo;

// import { createClient } from "redis";

// // const client = createClient({
// //     url: "redis://nayan:@redis-12900.crce182.ap-south-1-1.ec2.cloud.redislabs.com:12900"
// //     // url: "redis-12900.crce182.ap-south-1-1.ec2.cloud.redislabs.com:12900"
// // });
// const client = createClient();

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();
// console.log("Redis Client Connected");

// async function init() {
// //   await client.set(
// //     "user:1",
// //     JSON.stringify({ name: "Om", age: 25 })
// //   );

//   const result = await client.get("user:1");
//   console.log(JSON.parse(result));

//   process.exit(0);
// }

// init();