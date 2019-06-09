const mongoose = require('../db/connection.js');
const Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const Wager = new Schema({
    toWin: String,
    wager: Number,
    parentIdEvent: String,
    event: String,
    parentAccount: ObjectId
})

module.exports = mongoose.model('Wager', Wager);

