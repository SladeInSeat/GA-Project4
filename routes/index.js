const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accountController.js')
const eventController = require('../controllers/eventController.js')
const wagerController = require('../controllers/wagerController.js')
const apiController = require('../controllers/apiController.js')

//  Account CRUD routes

//  Create: creates or logs in a user
router.patch("/account/create", accountController.loginOrCreate)

//  Loads landing page, should find a better place than this file
router.get("/", accountController.showLandingPage)

//  Accounts Read all accounts
router.get("/accounts", accountController.findAllAccounts)

//  Accounts Read: single account
router.get("/account", accountController.findAccountById)

//  Accounts Update: updates name
router.patch("/account/updateName", accountController.updateAccountName)

//  Accounts Update: updates balance
router.patch("/account/updateBalance", accountController.updateAccountBalance)

//  Accounts Delete: deletes single user
router.delete("/account", accountController.deleteAccount)

//  API: get next 15 games
router.get("/api/next15", apiController.leagueNext15Games)

//  Event: get all events
router.get("/events", eventController.findAllEvents)

//  Event: find event by Id
router.get("/event", eventController.findEventById)

//  Event: create event
router.post("/event", eventController.createEvent)

//  Event: delete event
router.delete("/event", eventController.deleteEvent)

//  Wager: get all wagers
router.get("/wagers", wagerController.findAllWagers)

//  Wager; get wager by Id
router.get("/wager", wagerController.findWagerById)

//  Wager: create wager
router.post("/wager", wagerController.createWager)

//  Wager: update wager amount
router.patch("/wager/updateAmount", wagerController.updateWagerAmount)

//  Wager: delete wager
router.delete("/wager", wagerController.deleteWager)

module.exports = router


