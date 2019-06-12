import React, { Component } from 'react'
import axios from 'axios'
import EventDisplay from './EventDisplay';
import CreateWager from './CreateWager';
import WagerDisplay from './WagerDisplay';


class Dashboard extends Component {
    state = {
        activeAccount: {
            _id: '',
            balance: 0,
            name: ''
          }
    }

    render(){
        return(
            <div>
                I am dashboard
                <br></br>
                <EventDisplay/>
                <br></br>
                <CreateWager/>
                <br></br>
                <WagerDisplay/>
            </div>
        )
    }

}

export default Dashboard;