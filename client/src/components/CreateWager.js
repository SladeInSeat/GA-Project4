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
        //  set these values from props passed in, all but wager and to win
        newWager: {
            toWin: ' ',
            wager: 0,
            parentIdEvent: "596690",
            event: "Miami Marlins vs Atlanta Braves",
            parentAccount: "5cfe95dc08616b0004602dae"

        },
        tempWager: 0,
        tempToWin: ''
    }



    handleChangeToWin = (event) => {
        this.setState({tempToWin: event.target.value});
    }

    handleChangeWager = (event) => {
        this.setState({tempWager: event.target.value});
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let tempNewWager = {...this.state.newWager}
        tempNewWager.toWin = this.state.tempToWin
        tempNewWager.wager = this.state.tempWager
        await this.setState({newWager: tempNewWager });
        await axios.post("/event", { idEvent: this.state.activeEvent.idEvent,
                                event: this.state.activeEvent.event,
                                homeTeam: this.state.activeEvent.homeTeam,
                                awayTeam: this.state.activeEvent.awayTeam,
                                parentAccount: this.state.newWager.parentAccount
        })
        await axios.post("/wager", {toWin: this.state.newWager.toWin,
                                wager: this.state.newWager.wager,
                                parentIdEvent: this.state.newWager.parentIdEvent,
                                event: this.state.newWager.event,
                                parentAccount: this.state.newWager.parentAccount}
        )
    }
    
    render(){
        return (
            <div>
                I am Create a Wager:<br></br>
                Event Name: {this.state.activeEvent.event}
                <form onSubmit={this.handleSubmit}>
                    Choose team to win:
                    <select value={this.state.toWin} onChange={this.handleChangeToWin}>
                        <option value=''></option>
                        <option value={this.state.activeEvent.homeTeam}>{this.state.activeEvent.homeTeam}</option>
                        <option value={this.state.activeEvent.awayTeam}>{this.state.activeEvent.awayTeam}</option>
                    </select>
                    <br></br>
                    Choose an amount to wager:
                    <input
                        type="number"
                        value={this.state.tempWager}
                        onChange={this.handleChangeWager}
                        style={{ width: "70px" }}
                    />
                    <br></br>
                    <input type="submit" value="Submit" />
                </form>  
            </div>
        )
    }
}

export default CreateWager;