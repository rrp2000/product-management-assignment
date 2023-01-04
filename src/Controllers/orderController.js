const { default: mongoose } = require("mongoose")
const customerModel = require("../Models/customerModel")
const orderModel = require("../Models/orderModel")
const productModel = require("../Models/productModel")

const createOrder = async (req,res)=>{
    try {
        let orderData = req.body

        let {customerId, productId} = orderData

        // validations for customerId
        if(!mongoose.Types.ObjectId.isValid(customerId)) return res.status(400).send({status:false, message: `Enter a valid customerId format.`})
        let customer = await customerModel.findById(customerId)
        if(!customer) return res.status(400).send({status:false, message: `This customer doesn't exists.`})

        //validations for productId
        if(!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).send({status:false, message: `Enter a valid productId format.`})
        let product = await productModel.findById(productId)
        if(!product) return res.status(400).send({status:false, message: `This product doesn't exists.`})

        orderData.price = product.price
        
        let updates = {}
        updates.$set = {totalOrders : customer.totalOrders+1}
        
        if(updates.$set.totalOrders<10){
            console.log(`"You have placed ${updates.$set.totalOrders} orders with us. Buy ${10-updates.$set.totalOrders} more stuff and you will be
            promoted to Gold customer and enjoy 10% discounts!`)
        }
        if(updates.$set.totalOrders==10){
            console.log(`"You have placed ${updates.$set.totalOrders} orders with us. You are a Gold Member now. You can enjoy 10% discounts from now on!`)
        }
        
        if(updates.$set.totalOrders>10){
            updates.$set.type = "Gold"
            orderData.discount = 10
            orderData.price-= (orderData.price/100)*10
        }

        if(updates.$set.totalOrders>10 && updates.$set.totalOrders<20){
            console.log(`"You have placed ${updates.$set.totalOrders} orders with us. Buy ${20-updates.$set.totalOrders} more stuff and you will be
            promoted to Platinum customer and enjoy 20% discounts!`)
        }
        if(updates.$set.totalOrders==20){
            console.log(`"You have placed ${updates.$set.totalOrders} orders with us. You are a Platinum Member now. You can enjoy 20% discounts from now on!`)
        }
        if(updates.$set.totalOrders>20){
            updates.$set.type = "Platinum"
            orderData.discount = 20
            orderData.price-= (orderData.price/100)*20
        }

        let order = await orderModel.create(orderData)
        console.log(await customerModel.findOneAndUpdate({_id:customerId},updates,{new:true}))
        res.status(201).send({status:true, message:"created", data:order})

    } catch (error) {
        return res.status(500).send({status:false, message: error.message})
    }
}

module.exports = {createOrder}