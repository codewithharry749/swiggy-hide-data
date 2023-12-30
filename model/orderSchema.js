const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },

    citys: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    cart:  [],
    totalamount:{
        type:Number,
        required:true,
   
    }

});

const Order = mongoose.model("OrderFood", customerSchema);

module.exports = { Order }