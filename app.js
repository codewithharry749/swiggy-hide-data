const express = require('express');
const app = express();
require('dotenv').config()
app.use(express.json());


const connectDB = require('./config/db')
app.use(require('./routes/router'))

app.get('/', (req, res, next) => {
    res.send("hello")
    next();
});

// const port = process.env.PORT || 5000;
connectDB();
app.listen(process.env.port, () => {
    console.log(`server is live at port number : ${process.env.port}`)
});