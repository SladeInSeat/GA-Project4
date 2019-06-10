const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Account = new Schema({
    name: String,
    balance: {type: Number, default: 100}
})

module.exports = mongoose.model('Account', Account)