// YN7yquclLvjpJ2yT

// mongodb + srv://mtankmtank265:<password>@cluster0.q4z5wud.mongodb.net/?retryWrites=true&w=majority
require('dotenv').config()

const mongoose = require('mongoose')

module.exports = async () => {

    try {
        // const mongoUri =
        //     "mongodb+srv://mtankmtank265:YN7yquclLvjpJ2yT@cluster0.q4z5wud.mongodb.net/?retryWrites=true&w=majority";
        const connect = await mongoose.connect(process.env.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log(`MongoDB connected : ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};