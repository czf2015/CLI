const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    id: String, // '12',
    name: String, 
    image: String, 
    price: {
        required: Number, // 12,
        option: Number, // 12
    },
    inventory: Number,
    used: Number
})

module.exports = mongoose.model('Product', schema)