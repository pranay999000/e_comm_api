const mongoose = require('mongoose')
const slugify = require('slugify')

const OrderSchema = new mongoose.Schema({
    order_id: {
        type: String
    },
    product_id: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    seller: {
        type: String,
        required: true
    }
})

OrderSchema.pre('save', (next) => {
    if (this.order_id == null) {
        this.order_id = slugify(`${this._id}`)
    }
    next()
})

const Order = mongoose.model("Order", OrderSchema)
module.exports = Order