const axios = require('axios')
const btoa = require('btoa')

const mysportsfeedsApi = {
    getDailygames: function (req, res) {
        let date = new Date()
        let year = date.getFullYear()
        let month = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1)
        let day = ((date.getDate()) < 10 ? '0' : '') + (date.getDate())
        let yyyymmddString = year.toString(10) + month.toString(10) + day.toString(10)
        console.log(yyyymmddString)
        let urlString = "https://api.mysportsfeeds.com/v1.0/pull/mlb/current/daily_game_schedule.json?fordate=" + yyyymmddString
        axios({
            type: "GET",
            url:  urlString,
            dataType: 'json',
            async: false,
            headers: {
                Authorization: "Basic " + btoa(process.env.MSF_KEY_NONCOM + ":" + process.env.MSF_PASS)
            },
            success : function (){
                console.log('mysportsapiworked'); 
              }
        }).then((results) => {
            res.json(results.data)
        }).catch((err) => {
            console.log(err)
        })
    }
}

module.exports = mysportsfeedsApi;