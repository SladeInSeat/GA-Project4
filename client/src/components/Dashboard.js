import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


class Dashboard extends Component {
    state = {
        activeAccount: {
            _id: '',
            balance: 0,
            name: ''
          }
    }

    render(){
        return(
            <div>
                I am dashboard
            </div>
        )
    }

}

export default Dashboard;