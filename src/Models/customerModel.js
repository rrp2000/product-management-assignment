const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({

    fName:{
        type:String,
        required:true,
        trim:true
    },
    lName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    phone:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    type:{
        type:String,
        default: "Regular",
        enum:["Regular","Gold","Platinum"]
    },
    totalOrders:{
        type:Number,                                                                                                                                
        default:0
    }
},{timestamps:true})

let customerModel = new mongoose.model("Customer",customerSchema)

module.exports = customerModel