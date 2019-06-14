import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class EditWager extends Component {
    state = {
        wager: {
            _id: '',
            toWin: '',
            wager: 0,
            parentIdEvent: "596690",
            event: "Miami Marlins vs Atlanta Braves",
            parentAccount: "5cfe95dc08616b0004602dae"
        },
        deltaWager: 0
    }

    componentDidMount() {
        axios.get('/wager', {
            params: { wagerId: this.props.match.params.wagerId }
        })
            .then((foundWager) => {
                this.setState({ wager: foundWager.data[0] })
            })
    }

    handleWagerChange = (event) => {
        this.setState({ deltaWager: event.target.value })
    }

    handleTransactionWager = async (event) => {
        event.preventDefault()
        let tempWager = { ...this.state.wager }
        tempWager.wager = this.state.deltaWager
        await this.setState({ wager: tempWager })
        await axios.patch('/wager/updateAmount', {
            wagerId: this.state.wager._id,
            wager: this.state.wager.wager
        })
        .then(() => {
            axios.get('/wager', { params: { wagerId: this.props.match.params.wagerId } })
                .then((foundWager) => {
                    this.setState({ wager: foundWager.data[0] })
                })
        })
    }

    handleDeleteWager = async () => {
        await axios.delete('/wager', { data: { wagerId: this.state.wager._id } })
        let wagersForParentEvent = await axios.get("/wagers/event", { params: { parentIdEvent: this.state.wager.parentIdEvent } })
        console.log(wagersForParentEvent)
        if (wagersForParentEvent.data == 0) {
            let foundEvent = await axios.get('/event/eventid', { params: { idEvent: this.state.wager.parentIdEvent } })
            let delete_id = foundEvent.data[0]._id
            await axios.delete('/event', { data: { eventId: delete_id } })
        }
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <div>
                I am EditWager
                <br></br>
                Event: {this.state.wager.event}
                <br></br>
                To win: {this.state.wager.toWin}
                <br></br>
                Amount: {this.state.wager.wager}
                <br></br>
                <form>
                    <input
                        type="number"
                        value={this.state.deltaWager}
                        onChange={this.handleWagerChange}
                        style={{ width: "70px" }}
                    />
                    <button onClick={this.handleTransactionWager}>Change Amount</button>
                </form>
                <br></br>
                <button onClick={this.handleDeleteWager}>Delete Wager</button>
                <br></br>
                <Link to={`/dashboard`}>Back to Dashboard</Link>
            </div>
        )
    }
}

export default EditWager;