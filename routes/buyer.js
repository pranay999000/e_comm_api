const express = require('express')
const BuyerController = require('../controller/BuyerController')
const Router = express.Router()

Router.route('/createAccount')
    .post(BuyerController.createAccount)

Router.route('/createOrder')
    .post(BuyerController.createOrder)

Router.route('/viewOrder')
    .get(BuyerController.viewOrder)

Router.route('/viewProduct')
    .get(BuyerController.viewProduct)

module.exports = Router