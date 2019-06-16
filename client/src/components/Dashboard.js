import React, { Component } from 'react'
import EventDisplay from './EventDisplay';
import CreateWager from './CreateWager';
import WagerDisplay from './WagerDisplay';
import ActiveAccountDisplay from './ActiveAccountDisplay';


class Dashboard extends Component {
    state = {
        activeEvent: {
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
        this.setState({ wagerUpdate: !this.state.wagerUpdate })
    }

    render() {
        return (
            <div class='container'>
                <br></br>
                <div class='row'>
                <ActiveAccountDisplay
                    activeAccount={this.props.activeAccount}
                />
                </div>
                <br></br>
                <div class='row'>
                    <div class='col s7 m7 l7'>
                        <CreateWager
                            activeAccount={this.props.activeAccount}
                            activeEvent={this.state.activeEvent}
                            switchWagerUpdate={this.switchWagerUpdate}
                            handleBalanceChange={this.props.handleBalanceChange}
                        />
                        <WagerDisplay
                            activeAccount={this.props.activeAccount}
                            wagerUpdate={this.state.wagerUpdate} />
                    </div>
                    
                    <div class='col s5 m5 l5'>
                        <EventDisplay
                            setActiveEvent={this.setActiveEvent} />
                    </div>
                </div>
            </div>
        )
    }

}

export default Dashboard;