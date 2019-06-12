import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class WagerDisplay extends Component {
    state = {
        wagerlist: []
    }

    async componentDidMount() {
        let allWagers = await axios.get("/wagers")
            this.setState({ wagerlist: allWagers.data })
    }

    render(){
        const viewWageList = this.state.wagerlist.map((wager, index) => {
            return (
                <li key={index}>
                    Wager data: {wager.event}
                    <br></br>
                    To win: {wager.toWin}
                    <br></br>
                    Amount: {wager.wager}
                    <br></br>
                    <Link to={`/wagerDetails/${wager._id}`}>Wager Details</Link>
                </li>
            )
        })

        return(
            <div>
                {viewWageList}

            </div>
        )
    }

}

export default WagerDisplay;