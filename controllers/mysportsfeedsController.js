const axios = require('axios')
const btoa = require('btoa')

const mysportsfeedsApi = {
    getDailygames: function (req, res) {
        axios({
            type: "GET",
            url:  "https://api.mysportsfeeds.com/v1.0/pull/mlb/current/daily_game_schedule.json?fordate=20190617",
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