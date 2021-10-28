const mongoose = require('mongoose')
const slugify = require('slugify')

const ProductSchema = new mongoose.Schema({
    product_id: {
        type: String
    },
    productName: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seller: {
        type: String,
        required: true
    }
})

ProductSchema.pre('save', (next) => {
    if (this.product_id == null) {
        this.product_id = slugify(`${this._id}`)
    }
    console.log(this._id)
    next()
})

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product