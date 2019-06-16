import React, { Component } from 'react'
import axios from 'axios'



class EventDisplay extends Component{
    state = {
        eventList : []
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

    componentDidMount(){
        this.getNext15LeagueGames()
    }

    

    render(){
        const viewEventList = this.state.eventList.map((eventObj) => {
            return (
                <div class="card transparent z-index-1">
                    <div class="card-content green-text">
                        <div class="card-title green-text">{eventObj.event}</div>
                        <button class="transparent" style={{color: 'white'}} onClick={() => {this.props.setActiveEvent(eventObj)}}>Create A Wager</button>     
                    </div>
                </div>
                // <li key={index}>
                //     Event name: {eventObj.event}
                //     <br></br>
                //     <button onClick={() => {this.props.setActiveEvent(eventObj)}}>Place A Wager</button>
                // </li>
            )
        })
        
        return(
            <div>
                {viewEventList}
                <button onClick={this.getNext15LeagueGames}>Search</button>
            </div>
        )
    }

}

export default EventDisplay;