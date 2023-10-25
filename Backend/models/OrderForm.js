const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderDetailsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    pin:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    order_data: {
        type: Array,
        required: true,
    },
    verified:{
        type:Boolean,
        default:false
    }
    

});

module.exports = mongoose.model('orderdetails', OrderDetailsSchema)