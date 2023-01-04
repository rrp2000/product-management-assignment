const customerModel = require("../Models/customerModel")
const validator = require("../Validator/validator")

const createCustomer = async (req,res)=>{
    try {
        const customerData = req.body
        console.log(customerData)
        let status = true
        Object.keys(customerData).forEach(ele=>{
            if(["fName","lName","email","phone","password"].indexOf(ele)===-1){
                status = false
            }
        })

        if(!status) return res.status(400).send({status:false, message: `You can't add other properties than specified.`})

        const {
            fName,
            lName,
            email,
            phone,
            password
        } = customerData

        //validations for fName
        if(validator.validateString(fName)) return res.status(400).send({status:false, message: `First Name ${validator.validateString(fName)}`})
        if(!validator.checkOnlyLetters(fName))  return res.status(400).send({status:false, message: `First Name can only contain letters.`})

        //validations for lName
        if(validator.validateString(lName)) return res.status(400).send({status:false, message: `Last Name ${validator.validateString(lName)}`})
        if(!validator.checkOnlyLetters(lName))  return res.status(400).send({status:false, message: `Last Name can only contain letters.`})
        
        //validations for email
        if(validator.validateString(email)) return res.status(400).send({status:false, message: `Email ${validator.validateString(email)}`})
        if(!validator.checkEmail(email))  return res.status(400).send({status:false, message: `Enter a valid email.`})
        if(await customerModel.findOne({email:email}))  return res.status(400).send({status:false, message: `Email already Exists.`})

        //validations for phone
        if(validator.validateString(phone)) return res.status(400).send({status:false, message: `Phone ${validator.validateString(phone)}`})
        if(!validator.checkOnlyNumbers(phone))  return res.status(400).send({status:false, message: `Phone can only contain letters.`})
        if(phone.length!=10)  return res.status(400).send({status:false, message: `Phone should be of 10 digits.`})
        if(await customerModel.findOne({phone:phone}))  return res.status(400).send({status:false, message: `Phone already Exists.`})
        
        //validations for password
        if(validator.validateString(password)) return res.status(400).send({status:false, message: `Password ${validator.validateString(password)}`})
        
        let customer = await customerModel.create(customerData)

        return res.status(201).send({status:true, message:"created", data: customer})

    } catch (error) {
        return res.status(500).send({status:false, error:error.message}) 
    }
}

module.exports = {createCustomer}