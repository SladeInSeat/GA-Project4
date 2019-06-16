import React, { Component} from 'react'
import { Link } from 'react-router-dom'

class ActiveAccountDisplay extends Component {

    render() {
        return (
            <div class="card transparent z-depth-0">
            <div class="card-content white-text">
              <div class="card-title white-text">Account:{this.props.activeAccount.name}</div>
              Balance: {this.props.activeAccount.balance}
              <br></br>
              <button button style={{color: 'white'}} class="transparent" ><Link to='/'>Return To Login Page</Link></button>
            </div>
          </div>
        )
    }
}

export default ActiveAccountDisplay;