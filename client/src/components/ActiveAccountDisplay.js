import React, { Component} from 'react'
import { Link } from 'react-router-dom'

class ActiveAccountDisplay extends Component {

    render() {
        return (
            <div class="card blue-grey">
            <div class="card-content black-text">
              <div class="card-title black-text">Account: {this.props.activeAccount.name}</div>
              Balance: {this.props.activeAccount.balance}
              <br></br>
              <button button class="black" ><Link to='/'>Return To Login Page</Link></button>
            </div>
          </div>
        )
    }
}

export default ActiveAccountDisplay;