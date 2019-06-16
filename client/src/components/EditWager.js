import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class EditWager extends Component {
    state = {
        wager: {
            _id: '',
            toWin: '',
            wager: 0,
            parentIdEvent: '',
            event: '',
            parentAccount: ''
        },
        newWager: 0
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
        this.setState({ newWager: event.target.value })
    }

    handleTransactionWager = async (event) => {
        event.preventDefault()
        let wagerAmnt = this.state.newWager - this.state.wager.wager
        this.props.handleBalanceChange(wagerAmnt)
        let tempWager = { ...this.state.wager }
        tempWager.wager = this.state.newWager
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
        if (wagersForParentEvent.data == 0) {
            let foundEvent = await axios.get('/event/eventid', { params: { idEvent: this.state.wager.parentIdEvent } })
            let delete_id = foundEvent.data[0]._id
            await axios.delete('/event', { data: { eventId: delete_id } })
        }
        this.props.history.push('/dashboard')
    }

    render() {
        return (
            <div class="card transparent z-depth-6">
            <div class="card-content blue-text">
              <div class="card-title blue-text">Event: {this.state.wager.event}</div>
              To win: {this.state.wager.toWin}
                <br></br>
                Amount: {this.state.wager.wager}
                <br></br>
                <form>
                <div class='input-field col6'>
                    <input
                        type="number"
                        value={this.state.newWager}
                        onChange={this.handleWagerChange}
                        style={{ width: "70px", color: 'white' }}
                    />
                    <button onClick={this.handleTransactionWager}>Change Amount</button>
                </div>
                </form>
                <br></br>
                <button onClick={this.handleDeleteWager}>Delete Wager</button>
                <br></br>
                <Link to={`/dashboard`}>Back to Dashboard</Link>
            </div>
          </div>
            // <div>
            //     <br></br>
            //     Event: {this.state.wager.event}
            //     <br></br>
            //     To win: {this.state.wager.toWin}
            //     <br></br>
            //     Amount: {this.state.wager.wager}
            //     <br></br>
            //     <form>
            //         <input
            //             type="number"
            //             value={this.state.newWager}
            //             onChange={this.handleWagerChange}
            //             style={{ width: "70px" }}
            //         />
            //         <button onClick={this.handleTransactionWager}>Change Amount</button>
            //     </form>
            //     <br></br>
            //     <button onClick={this.handleDeleteWager}>Delete Wager</button>
            //     <br></br>
            //     <Link to={`/dashboard`}>Back to Dashboard</Link>
            // </div>
        )
    }
}

export default EditWager;