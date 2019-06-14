Event = require('../models/Event.js')
Account = require('../models/Account.js')

eventController = {

    findAllEvents : async function (req,res) {
         let allEvents = await Event.find()
         return res.json(allEvents)
    },

    findEventById : async function (req, res) {
        let foundEvent = await Event.find({_id: req.body.eventId})
        return res.json(foundEvent)
    },

    findEventByIdEvent : async function (req,res) {
        console.log(req.body)
        console.log(req.params)
        console.log(req.query)
        let foundEvent = await Event.find({ idEvent : req.query.idEvent})
        return res.json(foundEvent)
    },

    createEvent : async function (req,res) {
        let newEvent = await Event.create({idEvent: req.body.idEvent,
                                    event: req.body.event,
                                    homeTeam: req.body.homeTeam,
                                    awayTeam: req.body.awayTeam,
                                    parentAccount: req.body.parentAccount
                                })
        return res.json(newEvent)
    },

    deleteEvent : async function (req,res) {
        await Event.findByIdAndRemove({_id: req.body.eventId})
        return res.json(req.body)
    }

}

module.exports = eventController;