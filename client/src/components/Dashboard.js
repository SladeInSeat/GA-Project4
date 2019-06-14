import React, { Component } from 'react'
import EventDisplay from './EventDisplay';
import CreateWager from './CreateWager';
import WagerDisplay from './WagerDisplay';
import ActiveAccountDisplay from './ActiveAccountDisplay';


class Dashboard extends Component {
    state = {
        activeEvent : {
        },
        wagerUpdate: true
    }

    setActiveEvent = async (eventObj) => {
        let newActiveEvent = this.state.activeEvent
        newActiveEvent['idEvent'] = eventObj['idEvent']
        newActiveEvent['event'] = eventObj['event']
        newActiveEvent['homeTeam'] = eventObj['homeTeam']
        newActiveEvent['awayTeam'] = eventObj['awayTeam']
        await this.setState({ activeEvent: newActiveEvent })
      }

      switchWagerUpdate = () => {
          this.setState({wagerUpdate: !this.state.wagerUpdate})
      }

    render(){
        return(
            <div>
                I am dashboard
                <br></br>
                <ActiveAccountDisplay
                    activeAccount={this.props.activeAccount}
                />
                <br></br>
                <EventDisplay
                setActiveEvent={this.setActiveEvent}/>
                <br></br>
                <CreateWager
                activeAccount = {this.props.activeAccount}
                activeEvent = {this.state.activeEvent}
                switchWagerUpdate = {this.switchWagerUpdate}
                handleBalanceChange={this.props.handleBalanceChange}
                />
                <br></br>
                <WagerDisplay
                activeAccount = {this.props.activeAccount}
                wagerUpdate = {this.state.wagerUpdate}/>
            </div>
        )
    }

}

export default Dashboard;