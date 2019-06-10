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

//  Read: all accounts
router.get("/accounts", accountController.findAllAccounts)

//  Read: single account
router.get("/account", accountController.findAccountByName)

//  Update: updates name
router.patch("/account/updateName", accountController.updateAccountName)

//  Update: updates balance
router.patch("/account/updateBalance", accountController.updateAccountBalance)

//  Delete: deletes single user
router.delete("/account", accountController.deleteAccount)

module.exports = router


