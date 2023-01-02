const express = require("express")
const router = express.Router()
const customerController = require("../Controllers/customerController")
const productController = require("../Controllers/productController")
const orderController = require("../Controllers/orderController")


router.get("/hello", (req,res)=>res.send("hello world"))

//customer
router.post("/customer",customerController.createCustomer)

//
router.post("/product",productController.createProduct )

//order
router.post("/order" ,orderController.createOrder)




module.exports = router