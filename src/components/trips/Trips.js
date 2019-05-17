import React from 'react'
import { NavLink } from 'react-router-dom'
import TripSummary from './TripSummary'
import TripList from './TripList'

export default function FutureTrips() {
    return (
        <div className='future-trips section'>
            <div className='row'>
            <div className='col s3 m2'>
                <NavLink to='/addtrip'>+ Trip</NavLink>
                <TripList />
            </div>
            <div className='col s6 m10'>
                <TripSummary />
                <TripSummary />
                <TripSummary />
                <TripSummary />
            </div>
        </div>
        
        </div>
    )
}
