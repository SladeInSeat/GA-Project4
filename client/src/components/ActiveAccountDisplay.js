import React, { Component} from 'react'

class ActiveAccountDisplay extends Component {

    render() {
        return (
            <div>
                I am ActiveAccountDisplay
                <br></br>
                Account: {this.props.activeAccount.name}
                <br></br>
                Balance: {this.props.activeAccount.balance}
            </div>
        )
    }
}

export default ActiveAccountDisplay;