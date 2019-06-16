import React, { Component} from 'react'
import axios from 'axios'
// blue-grey
class CreateWager extends Component {
    state = {
        // activeEvent: {
        //     idEvent: "596690",
        //     event: "Miami Marlins vs Atlanta Braves",
        //     homeTeam: "Miami Marlins",
        //     awayTeam: "Atlanta Braves"
        //     },
        // activeAccount: {
        //     _id: "5cfe95dc08616b0004602dae",
        //     balance: 1020,  
        //     name: "test account",
        // },
        //  set these values from props passed in, all but wager and to win
        newWager: {
            toWin: ' ',
            wager: 0
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
        let foundEvent = await axios.get('/event/eventid', { params: { idEvent: this.props.activeEvent.idEvent } })
        if(foundEvent.data.length == 0){
            await axios.post("/event", { idEvent: this.props.activeEvent.idEvent,
                event: this.props.activeEvent.event,
                homeTeam: this.props.activeEvent.homeTeam,
                awayTeam: this.props.activeEvent.awayTeam,
                parentAccount: this.props.activeAccount._id
            })
        }
        await axios.post("/wager", {toWin: this.state.newWager.toWin,
                                wager: this.state.newWager.wager,
                                parentIdEvent: this.props.activeEvent.idEvent,
                                event: this.props.activeEvent.event,
                                parentAccount: this.props.activeAccount._id}
        )
        await this.props.handleBalanceChange(this.state.newWager.wager)
        await this.props.switchWagerUpdate()
    }
    
    render(){
        return (
            <div>
                <div class="card transparent z-depth-6">
                    <div class="card-content white-text">
                        <div class="card-title white-text">Event Name: 
                            <br></br>
                            {this.props.activeEvent.event}
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            Choose team to win:
                            <div class='input-field col6'>
                                <select class="browser-default" value={this.state.toWin} onChange={this.handleChangeToWin}>
                                    <option value={this.props.activeEvent.homeTeam}>{this.props.activeEvent.homeTeam}</option>
                                    <option value={this.props.activeEvent.awayTeam}>{this.props.activeEvent.awayTeam}</option>
                                </select>
                            </div>
                            <br></br>
                            Choose an amount to wager:
                            <div class='input-field col6'>
                            <input
                                type="number"
                                value={this.state.tempWager}
                                onChange={this.handleChangeWager}
                                style={{ width: "70px", color: 'white' }}
                            />
                            
                            <br></br>
                            <input class="transparent" style={{ width: "100px", color: 'white' }} type="submit" value="Place Wager" />
                            {/* <button button class="transparent" ><Link to={`/wagerDetails/${wager._id}`}>Wager Details</Link></button> */}
                            </div>
                        </form>

                    </div>
                </div>
            </div>
                // {
                    /* Event Name: {this.props.activeEvent.event}
                <form onSubmit={this.handleSubmit}>
                    Choose team to win:
                    <select value={this.state.toWin} onChange={this.handleChangeToWin}>
                        <option value=''></option>
                        <option value={this.props.activeEvent.homeTeam}>{this.props.activeEvent.homeTeam}</option>
                        <option value={this.props.activeEvent.awayTeam}>{this.props.activeEvent.awayTeam}</option>
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
                </form>   */
            // }
            // </div>
        )
    }
}

export default CreateWager;