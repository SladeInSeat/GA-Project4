Event = require('../models/Event.js')
Account = require('../models/Account.js')

eventController = {

    findAllEvents : async function (req,res) {
         let allEvents = await Event.find()
         return res.json(allEvents)
    },

    findEventById : async function (req, res) {
        let event = Event.findById(req.body.eventId)
        
    }

}

module.exports = eventController;