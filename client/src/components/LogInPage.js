import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class LogIn extends Component {
  state = {
    accounts: [{
      balance: 100,
      name: "hardcoded"
    }],
    activeAccount: {},
    newAccountName: "",
    deposit: 0,
    withdraw: 0
  }

  componentDidMount() {
    axios.get('/accounts')
      .then((accountList) => {
        this.setState({ accounts: accountList.data })
      })
  }

  setActiveAccount = (accountObj) => {
    let accountData = accountObj['account']
    this.setState({ activeAccount: accountData })
  }

  handleNameChange = (event) => {
    this.setState({ newAccountName: event.target.value });
  }

  handleCreateNewAccount = (event) => {
    event.preventDefault()
    axios.patch('/account/create', { accountName: this.state.newAccountName })
      .then(() => {axios.get('/accounts')
        .then((accountList) => {
          this.setState({ accounts: accountList.data })
        })
        
      })
  }

  handleDepositChange = (event) => {
    this.setState({deposit: event.target.value})

  }
  handleDeposit = (amount) => {
    axios.patch('/account/updateBalance', {accountBalance: amount})
  }

  handleDeleteAccount = (accountObj) => {
    let accountData = accountObj['account']['_id']
    axios.delete('/account', { data: { accountId: accountData } })
      .then(() => {
          axios.get('/accounts')
            .then((accountList) => {
              this.setState({ accounts: accountList.data })
            })
      })
  }



  render() {
    return (
      <div>
        <h1>Log-In</h1>
        <ol>
          {this.state.accounts.map((account, index) => {
            return (<li key={index}>
              Account Name: {account.name}
              <br></br>Balance: {account.balance}
              <br></br><button onClick={() => { this.setActiveAccount({ account }) }} >Login</button>
              <br></br>
              <Link to={`/accountDetails/${account._id}`}>Account Details</Link>
              </li>)
          })}
        </ol>
        <form>
          <input
            type="text"
            value={this.state.newAccountName}
            onChange={this.handleNameChange}
          />
          <button onClick={this.handleCreateNewAccount}>Create New Account</button>

        </form>


      </div>
    )
  }
}

export default LogIn;