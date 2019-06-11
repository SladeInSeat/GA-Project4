import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LogInPage from './components/LogInPage'
import AccountDetails from './components/AccountDetails';


class App extends Component {
  render () {
    return (
      <Router>
        <div>
        <Switch>
            <Route exact path="/" component={LogInPage}/>
            <Route path="/accountDetails/:accountId" component={AccountDetails}/>
        </Switch>
        </div>
      </Router>
    )
  }
}

export default App
