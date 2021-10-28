const Account = require('../Models/Account')
const Order = require('../Models/Orders')
const Product = require('../Models/Product')

exports.createAccount = async(req, res) => {
    try {

        let accountData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isSeller: true
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

exports.createProduct = async(req, res) => {
    try {

        let productData = {
            productName: req.body.productName,
            imageLink: req.body.imageLink,
            price: req.body.price,
            seller: req.body.seller
        }

        const CreateProduct = await Product.create(productData)

        res.status(201).json({
            status: "Created!!",
            data: CreateProduct
        })


    } catch(error) {
        res.status(502).json({
            status: "Failed!!",
            message: error.message
        })
    }
}

exports.viewOrder = async(req, res) => {
    try {

        let seller_id = req.query.seller_id

        let orderedProduct = await Order.aggregate([
            {$match: { seller: seller_id }},
            {$lookup: {
                from: "products",
                let: { product_id: "$product_id" },
                pipeline: [
                    {$match: {
                        $expr: { $and: [{$eq: ["$_id", {"$toObjectId": "$$product_id"}]}] }
                    }},
                ],
                as: "Product"
            }},
            {$lookup: {
                from: "accounts",
                let: { buyer_id: "$buyer" },
                pipeline: [
                    {$match: {
                        $expr: { $and: [{ $eq: ["$_id", {"$toObjectId": "$$buyer_id"}] }] }
                    }},
                    {$project: {
                        password: 0,
                        isSeller: 0
                    }}
                ],
                as: "Buyer"
            }}
        ])

        orders = []

        for (i in orderedProduct) {
            orders.push({
                product: orderedProduct[i].Product[0].productName,
                buyer: orderedProduct[i].Buyer[0]
            })
        }

        res.status(200).json({
            status: "Success",
            data: orders
        })

    } catch (error) {
        res.status(502).json({
            status: "Failed",
            data: error.message
        })
    }
}