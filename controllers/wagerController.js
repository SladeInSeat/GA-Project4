Wager = require('../models/Wager.js')

wagerController =  {
    createWager: async function (req, res) {
        let newWager = await Wager.create({
            toWin: req.body.toWin,
            wager: req.body.wager,
            parentIdEvent: req.body.parentIdEvent,
            event: req.body.event,
            parentAccount: req.body.parentAccount
        })
        return res.json(newWager)
    },
    //  only used in development, kept for debugging
    findAllWagers: async function(req,res) {
        let allWagers = await Wager.find()
        return res.json(allWagers)
    },

    findAllWagersByAccount: async function(req,res) {
        let allWagersByAccount = await Wager.find({parentAccount: req.query.parentAccount})
        return res.json(allWagersByAccount)
    },

    findWagerById: async function (req,res) {
        let wager = await Wager.find({_id: req.query.wagerId})
        return res.json(wager)
    },

    updateWagerAmount: async function (req,res) {
        let updatedWager = await Wager.findByIdAndUpdate(req.body.wagerId,
                                                        {$set: {wager: req.body.wager}},
                                                        {new: true})
        return res.json(updatedWager)                                         
    },

    deleteWager: async function (req,res) {
        await Wager.findByIdAndDelete(req.body.wagerId)
        res.json(req.body)
    }  

}

module.exports = wagerController;