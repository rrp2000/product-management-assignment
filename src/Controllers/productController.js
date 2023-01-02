const productModel = require("../Models/productModel")
const validator = require("../Validator/validator")


const createProduct = async (req,res) =>{
    try {

        let productData = req.body
        if(Object.keys(productData).length===0) return res.status(400).send({status:false, message: `Please give some data to create a product.`})
        let {name,price} = productData

        //validations for name
        if(validator.validateString(name)) return res.status(400).send({status:false, message: `Name ${validator.validateString(name)}`})

        let createdProduct = await productModel.create(productData)

        return res.status(201).send({status:true, message:"Created", data: createdProduct})
        
        
    } catch (error) {
        return res.status(500).send({status:false, message: error.message})
    }
}

module.exports = {createProduct}