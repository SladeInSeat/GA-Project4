Account = require('../models/Account.js')

const accountController = {

    loginOrCreate: async function (req, res) {
        let loggedInAccount = await Account.findOneAndUpdate(
            { name: req.body.accountName },
            {},
            {
                new: true,
                upsert: true
            })
        return res.json(loggedInAccount)
    },

    createAccount: async function (req, res) {
        let newAccount = await Account.create({ accountName: req.body.accountName })
        return res.json(newAccount)
    },

    findAllAccounts: async function (req, res) {
        let allAccounts = await Account.find()
        return res.json(allAccounts)
    },

    findAccountByName: async function (req, res) {
        let account = await Account.find({ name: req.body.name })
        return res.json(account)
    },

    updateAccountName: async function (req, res) {
        let updatedAccount = await Account.findByIdAndUpdate(req.body.accountId,
            { $set: { name: req.body.accountName } },
            { new: true })
        return res.json(updatedAccount)
    },

    updateAccountBalance: async function (req, res) {
        let updatedAccount = await Account.findByIdAndUpdate(req.body.accountId,
            { $set: { balance: req.body.accountBalance } },
            { new: true })
        return res.json(updatedAccount)
    },

    deleteAccount: async function (req, res) {
        await Account.findByIdAndDelete(req.body.accountId)
        return res.json(req.body)
    },

    showLandingPage: function (req, res) {
        res.send("working in heroku")
    }

}

module.exports = accountController