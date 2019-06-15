import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LogInPage from './components/LogInPage'
import AccountDetails from './components/AccountDetails';
import Dashboard from './components/Dashboard';
import EditWager from './components/EditWager';
import axios from 'axios';



class App extends Component {
  state = {
    activeAccount: {},
    newBalance: 0,
    deltaDeposit: 0,
    deltaWithdraw: 0,
    newAccountName: ''
  }

  setActiveAccount = async (accountObj, history) => {
    let newActiveAccount = this.state.activeAccount
    newActiveAccount['name'] = accountObj['name']
    newActiveAccount['_id'] = accountObj['_id']
    newActiveAccount['balance'] = accountObj['balance']
    await this.setState({ activeAccount: newActiveAccount })
    history.push('/dashboard')
  }

  handleBalanceChange = async (wagerAmnt) => {
    let newBalance = this.state.activeAccount.balance - wagerAmnt
    let newActiveAccount = { ...this.state.activeAccount }
    newActiveAccount.balance = newBalance
    await this.setState({ activeAccount: newActiveAccount })
    await axios.patch('/account/updateBalance', {
      accountId: this.state.activeAccount._id,
      accountBalance: this.state.activeAccount.balance
    })
  }

  handleNewBalanceChange = (event) => {
    this.setState({ newBalance: event.target.value })
  }


  render() {

    const DashboardRender = (props) => {
      return (
        <Dashboard
          {...props}
          activeAccount={this.state.activeAccount}
          // setActiveAccount={this.setActiveAccount}
          handleBalanceChange={this.handleBalanceChange}
        />
      )
    }

    const EditWagerRender = (props) => {
      return (
        <EditWager
          {...props}
          handleBalanceChange={this.handleBalanceChange}
        />
      )
    }

    const LogInPageRender = (props) => {
      return (
        <LogInPage          
          {...props}
          setActiveAccount={this.setActiveAccount}
        />
      )
    }

    const AccountDetailsRender = (props) => {
      return (
        <AccountDetails
        />
      )
    }


    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={LogInPageRender} />
            <Route path="/accountDetails/:accountId" component={AccountDetails} />
            <Route path="/wagerDetails/:wagerId" render={EditWagerRender} />
            <Route exact path="/dashboard" render={DashboardRender} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
