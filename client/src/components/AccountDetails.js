import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class AccountDetails extends Component {
    state = {
        account: {},
        newAccountName: '',
        newBalance: 0,
        deltaDeposit: 0,
        deltaWithdraw: 0
    }

    componentDidMount() {
        axios.get('/account', { params: { accountId: this.props.match.params.accountId } })
            .then((foundacc) => {
                this.setState({ account: foundacc.data[0] })
            })
    }

    handleAccountNameChange = (event) => {
        this.setState({ newAccountName: event.target.value });
    }

    accountNameChange = (event) => {
        event.preventDefault()
        // this.setState({name = this.state.newAccountName})
        axios.patch('/account/updateName', {
            accountId: this.state.account._id,
            accountName: this.state.newAccountName
        })
            .then(() => {
                axios.get('/account', { params: { accountId: this.props.match.params.accountId } })
                    .then((foundacc) => {
                        this.setState({ account: foundacc.data[0] })
                    })

            })
    }

    handleDeposit = (event) => {
        this.setState({ deltaDeposit: event.target.value })
    }

    handleWithrawl = (event) => {
        this.setState({ deltaWithdraw: event.target.value })
    }

    handleAccountDetailsTransaction = async (event) => {
        event.preventDefault()
        let calculatedBalance = parseInt(this.state.account.balance, 10) +
            parseInt(this.state.deltaDeposit, 10) -
            parseInt(this.state.deltaWithdraw, 10)
        await this.setState({ newBalance: calculatedBalance })
        await axios.patch('/account/updateBalance', {
            accountId: this.state.account._id,
            accountBalance: this.state.newBalance
        })
            .then(() => {
                axios.get('/account', { params: { accountId: this.props.match.params.accountId } })
                    .then((foundacc) => {
                        this.setState({ account: foundacc.data[0] })
                    })
            }).then(() => {
                this.setState({ newBalance: 0, deltaDeposit: 0, deltaWithdraw: 0 })
            })
    }

    handleAccountDelete = () => {
        axios.delete('/account', { data: { accountId: this.state.account._id } })
            .then(() => this.props.history.push('/'))

    }

    render() {
        return (
            <div class="card blue-grey">
            <div class="card-content black-text">
              <div class="card-title black-text"><h1>Accout Details</h1></div>
              Name: {this.state.account.name}
              <br></br>
              <form>
                <div class='input-field col6'>
                    <input
                        type="text"
                        value={this.state.newAccountName}
                        onChange={this.handleAccountNameChange}
                    />
                    <button onClick={this.accountNameChange}>Change Account Name</button>
                    </div>
                </form>
                <br></br>
                Balance: {this.state.account.balance}
                <br></br>
                <form>
                    <div class='input-field col6'>
                        <input
                            type="number"
                            value={this.state.deltaDeposit}
                            onChange={this.handleDeposit}
                            style={{ width: "70px" }}
                        />
                        <button onClick={this.handleAccountDetailsTransaction}>Deposit</button>
                    </div>
                </form>
                <form>
                    <div class='input-field col6'>
                        <input
                            type="number"
                            value={this.state.deltaWithdraw}
                            onChange={this.handleWithrawl}
                            style={{ width: "70px" }}
                        />
                        <button onClick={this.handleAccountDetailsTransaction}>Withdraw</button>
                    </div>
                </form>
                <br></br>
                <button button class="black" ><Link to={`/`}>Back to Login</Link></button>
                <br></br>
                <br></br>
                <button button class="blue darken-3 black-text"onClick={this.handleAccountDelete}>Delete Account</button>
            </div>
          </div>
            // <div>
            //     <h1>Accout Details</h1>
            //     Name: {this.state.account.name}
            //     <br></br>
            //     <form>
            //         <input
            //             type="text"
            //             value={this.state.newAccountName}
            //             onChange={this.handleAccountNameChange}
            //         />
            //         <button onClick={this.accountNameChange}>Change Account Name</button>
            //     </form>
            //     <br></br>
            //     Balance: {this.state.account.balance}
            //     <br></br>
            //     <form>
            //         <input
            //             type="number"
            //             value={this.state.deltaDeposit}
            //             onChange={this.handleDeposit}
            //             style={{ width: "70px" }}
            //         />
            //         <button onClick={this.handleAccountDetailsTransaction}>Deposit</button>
            //     </form>
            //     <form>
            //         <input
            //             type="number"
            //             value={this.state.deltaWithdraw}
            //             onChange={this.handleWithrawl}
            //             style={{ width: "70px" }}
            //         />
            //         <button onClick={this.handleAccountDetailsTransaction}>Withdraw</button>
            //     </form>
            //     <br></br>
            //     <Link to={`/`}>Back to Login</Link>
            //     <br></br>
            //     <br></br>
            //     <button onClick={this.handleAccountDelete}>Delete Account</button>
            // </div>
        )
    }

}

export default AccountDetails;