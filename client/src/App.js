import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LogInPage from './components/LogInPage'
import AccountDetails from './components/AccountDetails';
import Dashboard from './components/Dashboard';
import EditWager from './components/EditWager';



class App extends Component {
  state = {    
    activeAccount: {},
    newBalance: 0,
    deltaDeposit: 0,
    deltaWithdraw: 0
  }

  setActiveAccount = async (accountObj) => {
    let newActiveAccount = this.state.activeAccount
    newActiveAccount['name'] = accountObj['account']['name']
    newActiveAccount['_id'] = accountObj['account']['_id']
    newActiveAccount['balance'] = accountObj['account']['balance']
    await this.setState({ activeAccount: newActiveAccount })
  }



  render () {

    const DashboardRender = (props) => {
      return (
        <Dashboard
          {...props}
          activeAccount={this.state.activeAccount}
          setActiveAccount={this.setActiveAccount}
        />
      )
    }

    const EditWagerRender = (props) => {
      return (
        <EditWager
          {...props}
        />
      )
    }

    const LogInPageRender = (props) => {
      return (
        <LogInPage
          setActiveAccount={this.setActiveAccount}
          />
      )
    }


    return (
      <Router>
        <div>
        <Switch>
            <Route exact path="/" render={LogInPageRender}/>
            <Route path="/accountDetails/:accountId" component={AccountDetails}/>
            <Route path="/wagerDetails/:wagerId" render={EditWagerRender}/>
            <Route exact path="/dashboard" render={DashboardRender}/>
        </Switch>
        </div>
      </Router>
    )
  }
}

export default App
