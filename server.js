const express = require('express')
const logger = require('morgan')
const app = express()

app.use(logger('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json)

app.get('/', (res,req) => {
    res.send("working now")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('app is running on ' + PORT)
})

