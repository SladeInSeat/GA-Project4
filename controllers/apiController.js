const axois = require('axios')

const apiController = {

    //     leagueNext15Games: async function(req, res) {
    //         let next15Games = await axois.get('https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php',
    //                     {params: {id:'4424'}})
    //         console.log(req.body)
    //         console.log(req.params)
    //         console.log(req.query)
    //         res.json(next15Games)
    //     }

    // }

    leagueNext15Games: function (req, res) {
        axois.get('https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php',
            { params: { id: 4424 } }
        ).then((next15games) => {
            console.log(req.body)
            console.log(req.params)
            console.log(req.query)
            console.log(next15games)
            res.json(next15games.data)
        }).catch((err) => {
            console.log(err)
        })
    }
}

module.exports = apiController;