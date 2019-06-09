const Account = require('../models/Account.js')
const Event = require('../models/Event.js')
const Wager = require('../models/Wager.js')
mongoose = require('mongoose')



const newAccount = {name: 'test account', balance: 1000}


const createSeeds = async () => {
    await Account.deleteMany()
    let createdAccount = await Account.create(newAccount)
    console.log(createdAccount)

    let foundAccount = await Account.find()
    console.log(foundAccount[0]._id)

    await Event.deleteMany()
    let createdEvent = await Event.create({idEvent: "596690",
                                            event: "Miami Marlins vs Atlanta Braves",
                                            homeTeam: "Miami Marlins",
                                            awayTeam: "Atlanta Braves",
                                            parentAccount: foundAccount[0]._id
                                            },
                                            {idEvent: "596691",
                                            event: "Chicago Cubs vs St. Louis Cardinals",
                                            homeTeam: "St. Louis Cardinals",
                                            awayTeam: "Chicago Cubs",
                                            parentAccount: foundAccount[0]._id
                                            },
                                            {idEvent: "596692",
                                            event: "New York Mets vs Colorado Rockies",
                                            homeTeam: "Colorado Rockies",
                                            awayTeam: "New York Mets",
                                            parentAccount: foundAccount[0]._id
                                            }
                                        )
    console.log(createdEvent)

    let foundEvent = await Event.find()

    await Wager.deleteMany()
    let createWager = await Wager.create({toWin: foundEvent[0].awayTeam,
                                            wager: 50,
                                            parentIdEvent: foundEvent[0].idEvent,
                                            event: foundEvent[0].event,
                                            parentAccount: foundEvent[0].parentAccount
                                            },
                                            {toWin: foundEvent[1].awayTeam,
                                            wager: 100,
                                            parentIdEvent: foundEvent[1].idEvent,
                                            event: foundEvent[1].event,
                                            parentAccount: foundEvent[1].parentAccount
                                            }
                                        )
    console.log(createWager)
}

createSeeds()


