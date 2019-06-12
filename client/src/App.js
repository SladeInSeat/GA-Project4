import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LogInPage from './components/LogInPage'
import AccountDetails from './components/AccountDetails';
import Dashboard from './components/Dashboard';



class App extends Component {
  state = {    
    activeAccount: {
      _id: '',
      balance: 0,
      name: ''
    },
    newBalance: 0,
    deltaDeposit: 0,
    deltaWithdraw: 0
  }

  setActiveAccount = (accountObj) => {
    let newActiveAccount = this.state.activeAccount
    newActiveAccount['name'] = accountObj['account']['name']
    newActiveAccount['_id'] = accountObj['account']['_id']
    newActiveAccount['balance'] = accountObj['account']['balance']
    this.setState({ activeAccount: newActiveAccount })
    this.props.history.push('/dashboard')
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


    return (
      <Router>
        <div>
        <Switch>
            <Route exact path="/" component={LogInPage}/>
            <Route path="/accountDetails/:accountId" component={AccountDetails}/>
            {/* <Route path="/wagerDetails/:wagerId" */}
            <Route path="/dashboard" render={DashboardRender}/>
        </Switch>
        </div>
      </Router>
    )
  }
}

export default App
