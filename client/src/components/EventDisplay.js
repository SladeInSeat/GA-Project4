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

    getNext15LeagueGames = async  () => {
        let gamesListObj = await axios.get('/api/next15')
        let gameList = []
        for(let i =0; i < 15; i++){
            let tempEvent = {}
            tempEvent.event = gamesListObj.data.events[i].strEvent
            tempEvent.idEvent = gamesListObj.data.events[i].idEvent
            tempEvent.homeTeam = gamesListObj.data.events[i].strHomeTeam
            tempEvent.awayTeam = gamesListObj.data.events[i].strAwayTeam
            gameList.push(tempEvent)
        }
        this.setState({eventList: gameList})
        
    }


    

    render(){
        const viewEventList = this.state.eventList.map((eventObj, index) => {
            return (
                <li key={index}>
                    Event name: {eventObj.event}
                    <br></br>
                    <button onClick={() => {this.props.setActiveEvent(eventObj)}}>Place A Wager</button>
                </li>
            )
        })
        
        return(
            <div>
                I am EventDisplay
                <ol>
                    {viewEventList}
                </ol>
                <button onClick={this.getNext15LeagueGames}>Search</button>
            </div>
        )
    }

}

export default EventDisplay;