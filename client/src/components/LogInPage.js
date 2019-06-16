import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class LogIn extends Component {
  state = {
    accounts: [],
    activeAccount: {},
    newAccountName: ""
  }

  componentDidMount() {
    axios.get('/accounts')
      .then((accountList) => {
        this.setState({ accounts: accountList.data })
      })
  }

  //  this should be prop from app
  // setActiveAccount = (accountObj) => {
  //   let newActiveAccount = this.state.activeAccount
  //   newActiveAccount['name'] = accountObj['account']['name']
  //   newActiveAccount['_id'] = accountObj['account']['_id']
  //   newActiveAccount['balance'] = accountObj['account']['balance']
  //   this.setState({ activeAccount: newActiveAccount })
  //   this.props.history.push('/dashboard')
  // }

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

  handleLogIn = function() {
    this.props.history.push('/dashboard')
  }
  
  // handleDepositChange = (event) => {
  //   this.setState({deposit: event.target.value})
  // }
  
  // handleDeposit = (amount) => {
  //   axios.patch('/account/updateBalance', {accountBalance: amount})
  // }

  // handleDeleteAccount = (accountObj) => {
  //   let accountData = accountObj['account']['_id']
  //   axios.delete('/account', { data: { accountId: accountData } })
  //     .then(() => {
  //         axios.get('/accounts')
  //           .then((accountList) => {
  //             this.setState({ accounts: accountList.data })
  //           })
  //     })
  // }



  render() {
    return (
      <div class="container">
        <div class="row">
          {this.state.accounts.map((account, index) => {
            return(
              <div class="card transparent z-depth-0">
                <div class="card-content white-text">
                  <div class="card-title white-text">{account.name}</div>
                  Balance: {account.balance}
                  <br></br>
                  <button class="transparent white-text" onClick={() => { this.props.setActiveAccount(account, this.props.history) }} >Activate Account</button>
                  <button button class="transparent white-text" ><Link to={`/accountDetails/${account._id}`}>Account Details</Link></button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      // <div>
      //   <h1>Log-In</h1>
      //   <ol>
      //     {this.state.accounts.map((account, index) => {
      //       return (<li key={index}>
      //         Account Name: {account.name}
      //         <br></br>Balance: {account.balance}
      //         <br></br><button onClick={() => { this.props.setActiveAccount(account, this.props.history) }} >Activate Account</button>
      //         <br></br>
      //         <Link to={`/accountDetails/${account._id}`}>Account Details</Link>
      //         </li>)
      //     })}
      //   </ol>
      //   <form>
      //     <input
      //       type="text"
      //       value={this.state.newAccountName}
      //       onChange={this.handleNameChange}
      //     />
      //     <button onClick={this.handleCreateNewAccount}>Create New Account</button>

      //   </form>
      //   <br></br>

      //   <Link to={'/dashboard'}>Go To Dashboard</Link>



      // </div>
    )
  }
}

export default LogIn;