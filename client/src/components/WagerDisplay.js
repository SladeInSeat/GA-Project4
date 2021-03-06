import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class WagerDisplay extends Component {
    state = {
        wagerlist: []
    }

    async componentDidMount() {   
        let allWagers = await axios.get("/wagers",{params: {parentAccount: this.props.activeAccount._id}})
        await this.setState({ wagerlist: allWagers.data })
    }

    componentDidUpdate(prevProps) {
        if (this.props.wagerUpdate !== prevProps.wagerUpdate) {
            axios.get("/wagers",{params: {parentAccount: this.props.activeAccount._id}})
            .then((allWagers) => {
                this.setState({ wagerlist: allWagers.data });
            })
        }
      }

    render(){
        const viewWageList = this.state.wagerlist.map((wager, index) => {
            return (
                <div key={index} class="card transparent z-depth-6">
                <div class="card-content blue-text">
                  <div class="card-title blue-text">{wager.event}</div>
                    To win: {wager.toWin}
                    <br></br>
                    Amount: {wager.wager}
                    <br></br>
                    <button button class="transparent" ><Link to={`/wagerDetails/${wager._id}`}>Wager Details</Link></button>
                    {/* <button button class="black white-text" ><Link to={`/wagerDetails/${wager._id}`}>Wager Details</Link></button> */}
                    {/* <Link to={`/wagerDetails/${wager._id}`}>Wager Details</Link> */}
                </div>
              </div>
                // <li key={index}>
                //     Wager data: {wager.event}
                //     <br></br>
                //     To win: {wager.toWin}
                //     <br></br>
                //     Amount: {wager.wager}
                //     <br></br>
                //     <Link to={`/wagerDetails/${wager._id}`}>Wager Details</Link>
                // </li>
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