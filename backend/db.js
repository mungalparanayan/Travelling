const mongoose = require('mongoose');

// const mongoURI = "mongodb://0.0.0.0/travel"
const mongoURI = "mongodb+srv://Travelling:TRAVEL@cluster0.i9vthyp.mongodb.net/Travel?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = ()=> {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
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