import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LogInPage from './components/LogInPage'


class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <LogInPage/>
        </div>
      </Router>
    )
  }
}

export default App
