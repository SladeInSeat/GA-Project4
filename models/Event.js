const mongoose = require('../db/connection.js');
const Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

const Event = new Schema({
    idEvent: String,
    event: String,
    homeTeam: String,
    awayTeam: String,
    thumbPath: String,
    parentAccount: ObjectId
})

module.exports = mongoose.model('Event', Event)