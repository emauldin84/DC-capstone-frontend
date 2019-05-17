import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Map from './Map'
import TripList from '../trips/TripList'

export default class Dashboard extends Component {
    render() {
        return (
        <div className='dashboard'>
            <div className='row'>
                <div className='col s3 m2'>
                    <NavLink to='/addtrip'>+ Trip</NavLink>
                    <TripList />
                </div>
                <div className='col s6 m10'>
                    <Map />
                </div>
            </div>

        </div>
        )
    }
}
