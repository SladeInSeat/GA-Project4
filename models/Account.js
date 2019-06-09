const mongoose = require('../db/connection.js')
const Schema = mongoose.Schema

const Account = new Schema({
    name: String,
    balance: Number
})

module.exports = mongoose.model('Account', Account)