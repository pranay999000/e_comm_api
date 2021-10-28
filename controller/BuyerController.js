const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

const Order = require('../Models/Orders')
const Account = require('../Models/Account')
const Product = require('../Models/Product')

exports.createAccount = async(req, res) => {
    try {

        let accountData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isSeller: false
        }

        const CreateAccount = await Account.create(accountData)

        res.status(201).json({
            status: "Created",
            data: CreateAccount
        })

    } catch(error) {
        res.status(502).json({
            status: "Failed",
            message: error.message
        })
    }
}

exports.createOrder = async(req, res) => {
    try {

        let orderData = {
            product_id: req.body.product_id,
            buyer: req.body.buyer,
            seller: req.body.seller
        }

        const CreateOrder = await Order.create(orderData)

        res.status(201).json({
            status: "Created",
            data: CreateOrder
        })

    } catch (error) {
        res.status(502).json({
            status: "Failed!!",
            message: error.message
        })
    }
}

exports.viewOrder = async (req, res) => {
    try {

        let buyer_id = req.query.buyer_id

        let orderedProduct = await Order.aggregate([
            {$match: { buyer: buyer_id }},
            {$lookup: {
                from: "products",
                let: { product_id: "$product_id" },
                pipeline: [
                    {$match: {
                        $expr: { $and: [{$eq: ["$_id",  {"$toObjectId": "$$product_id"}]}] }
                    }},
                ],
                as: "Product"
            }},
            {$lookup: {
                from: "accounts",
                let: { seller_id: "$seller" },
                pipeline: [
                    {$match: {
                        $expr: { $and: [{ $eq: ["$_id", {"$toObjectId": "$$seller_id"} ] }] }
                    }},
                    {$project: {
                        password: 0,
                        isSeller: 0
                    }}
                ],
                as: "Seller"
            }}
        ])

        ordered = []

        for (i in orderedProduct) {
            ordered.push({
                product: orderedProduct[i].Product[0],
                seller: orderedProduct[i].Seller[0]
            })
        }

        res.status(200).json({
            status: "Success",
            data: ordered
        })

    } catch (error) {
        res.status(502).json({
            status: "Failed",
            message: error.message
        })
    }
}

exports.viewProduct = async(req, res) => {
    try {

        let products = await Product.aggregate([
            {$project: {
                __v: 0
            }}
        ])

        res.status(200).json({
            status: "Success",
            data: products
        })

    } catch(error) {
        res.status(502).json({
            status: "Failed",
            message: error.message
        })
    }
}