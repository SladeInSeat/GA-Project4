import React, { Component } from 'react'
import axios from 'axios'
import EventDisplay from './EventDisplay';
import CreateWager from './CreateWager';
import WagerDisplay from './WagerDisplay';


class Dashboard extends Component {
    state = {
        activeEvent : {
        }
    }

    setActiveEvent = async (eventObj) => {
        let newActiveEvent = this.state.activeEvent
        newActiveEvent['idEvent'] = eventObj['idEvent']
        newActiveEvent['event'] = eventObj['event']
        newActiveEvent['homeTeam'] = eventObj['homeTeam']
        newActiveEvent['awayTeam'] = eventObj['awayTeam']
        await this.setState({ activeEvent: newActiveEvent })
      }

    render(){
        return(
            <div>
                I am dashboard
                <br></br>
                <EventDisplay
                setActiveEvent={this.setActiveEvent}/>
                <br></br>
                <CreateWager
                activeAccount = {this.props.activeAccount}
                />
                <br></br>
                <WagerDisplay/>
            </div>
        )
    }

}

export default Dashboard;