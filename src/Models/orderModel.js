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
    },price:{
        type:Number
    }

},{timestamps:true})

module.exports = new mongoose.model("Order",orderSchema)