const mongoose = require('mongoose')
const slugify = require('slugify')

const AccountSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isSeller: {
        type: Boolean,
        required: true
    }
})

AccountSchema.pre('save', (next) => {
    if (this.user_id == null) {
        this.user_id = slugify(`${this._id}`)
    }
    next()
})

const Post = mongoose.model("Accounts", AccountSchema)
module.exports = Post