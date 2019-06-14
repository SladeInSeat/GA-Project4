import React, { Component} from 'react'
import { Link } from 'react-router-dom'

class ActiveAccountDisplay extends Component {

    render() {
        return (
            <div>
                I am ActiveAccountDisplay
                <br></br>
                Account: {this.props.activeAccount.name}
                <br></br>
                Balance: {this.props.activeAccount.balance}
                <br></br>
                <Link to='/'>Return To Login Page</Link>
            </div>
        )
    }
}

export default ActiveAccountDisplay;