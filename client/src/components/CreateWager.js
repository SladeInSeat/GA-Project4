import React, { Component} from 'react'
import axios from 'axios'

class CreateWager extends Component {
    state = {
        activeEvent: {
            idEvent: "596690",
            event: "Miami Marlins vs Atlanta Braves",
            homeTeam: "Miami Marlins",
            awayTeam: "Atlanta Braves"
            },
        activeAccount: {
            _id: "5cfe95dc08616b0004602dae",
            balance: 1020,  
            name: "test account",
        },
        wager: 0
    }

    render(){
        return (
            <div>
                I am CreateWager. I will create an event,
                then create a wager on the event, saving
                both event and wager to db.
            </div>
        )
    }
}

export default CreateWager;