const express = require('express')
const SellerController = require('../controller/SellerController')
const Router = express.Router()

Router.route('/createAccount')
    .post(SellerController.createAccount)

Router.route('/createProduct')
    .post(SellerController.createProduct)

Router.route('/viewOrder')
    .get(SellerController.viewOrder)

module.exports = Router