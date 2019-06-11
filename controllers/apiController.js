const axois = require('axios')

const apiController = {

    leagueNext15Games: async function (req, res) {
        let next15Games = await axois.get('https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php',
                                { params: { id: 4424 } })
        res.json(next15Games.data)
    }

}

module.exports = apiController;