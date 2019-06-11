import React, { Component } from 'react'
import axios from 'axios'



class EventDisplay extends Component{
    state = {
        eventList : [
            {idEvent: "596690",
            event: "Miami Marlins vs Atlanta Braves",
            homeTeam: "Miami Marlins",
            awayTeam: "Atlanta Braves",
            parentAccount: "5cfe95dc08616b0004602dae"
            },
            {idEvent: "596691",
            event: "Chicago Cubs vs St. Louis Cardinals",
            homeTeam: "St. Louis Cardinals",
            awayTeam: "Chicago Cubs",
            parentAccount: "5cfe95dc08616b0004602dae"
            },
            {idEvent: "596692",
            event: "New York Mets vs Colorado Rockies",
            homeTeam: "Colorado Rockies",
            awayTeam: "New York Mets",
            parentAccount: "5cfe95dc08616b0004602dae"
            }
        ]
    }

    getNext15LeagueGames = async function () {
        console.log('inside getnext15LeageGames')
        let gamesList = await axios.get('/api/next15')
        await console.log(gamesList)
    }


    render(){
        const viewEventList = this.state.eventList.map((eventObj, index) => {
            return (
                <li key={index}>
                    Event name: {eventObj.event}
                </li>
            )
        })
        return(
            <div>
                <ol>
                    {viewEventList}
                </ol>
                <button onClick={this.getNext15LeagueGames}>Search</button>
            </div>
        )
    }

}

export default EventDisplay;