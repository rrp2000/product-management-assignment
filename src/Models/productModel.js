const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true
    }

},{timestamps:true})

module.exports = new mongoose.model("Product", productSchema)