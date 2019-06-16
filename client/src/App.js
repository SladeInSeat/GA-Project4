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

  
  setActiveAccount = (accountObj, history) => {
    this.setState({ activeAccount: accountObj })
    history.push('/dashboard')
  }

  handleBalanceChange = async (wagerAmnt) => {
    const calculatedBalance = this.state.activeAccount.balance - wagerAmnt
    const updatedAccount = (await axios.patch('/account/updateBalance', {
      accountId: this.state.activeAccount._id,
      accountBalance: calculatedBalance
    })).data
    this.setState({ activeAccount: updatedAccount })
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
        <div class='container'>
          <nav>
            <div class="nav-wrapper">
              <a href="#" class="brand-logo">BigBoard for MLB</a>
              <ul id="nav-mobile" class="right">
                <li><a href="/">Log In</a></li>
              </ul>
            </div>
          </nav>
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
