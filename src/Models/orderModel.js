const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

    customerId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Customer"
    },
    productId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Product"
    },
    discount:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true
    }

},{timestamps:true})

module.exports = new mongoose.model("Order",orderSchema)