import React, { Component} from 'react'
import axios from 'axios'


class LogIn extends Component {
    state = {
        accounts : [{
          balance:1000,
          name:"test account"}]
    }

    componentDidMount(){
        axios.get('/accounts')
        .then((accountList) => {
          console.log(accountList)
          this.setState({accounts : accountList.data})
        })
    }

    render () {
        return (
          <div>
            <h1>Log-In</h1>    
            <ol>
            {this.state.accounts.map((account, index) => {
              return (<li key={index}>
              Account Name: {account.name}
              <br></br>Balance: {account.balance}
              <br></br><button>Login</button></li>)
            })}
            </ol>

          </div>
        )
      }
}

export default LogIn;