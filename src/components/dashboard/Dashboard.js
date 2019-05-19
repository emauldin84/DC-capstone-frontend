import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Map from './Map'
import TripList from '../trips/TripList'

export default class Dashboard extends Component {
    render() {
        const { trips } = this.props
        return (
        <div className='dashboard'>
            <div className='row'>
                <div className='col s3 m2'>
                    <NavLink  className='addTrip' to='/addtrip'>+ Trip</NavLink>
                    <TripList trips={trips}/>
                </div>
                <div className='col s6 m10'>
                    <Map />
                </div>
            </div>

        </div>
        )
    }
}
