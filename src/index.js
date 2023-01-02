const bodyParser = require("body-parser")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const router = require("./Routes/router")

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use("/",router)

mongoose.connect("mongodb+srv://spacespider:admin@cluster0.0ps1ymn.mongodb.net/product-management-assignment").then(()=>{
    console.log("Mongodb connected...")
    app.listen(4000,()=>{
        console.log("Express running on", 4000)
    })
})
