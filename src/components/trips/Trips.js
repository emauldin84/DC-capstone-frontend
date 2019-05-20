import React from 'react'
import { NavLink } from 'react-router-dom'
import TripSummary from './TripSummary'
import TripList from './TripList'

export default function Trips({trips}) {
    return (
        <div className='future-trips section'>
            <div className='row'>
            <div className='col s3 m2'>
            <NavLink  className='addTrip btn-floating waves-effect waves-light' to='/addtrip' title='add trip'><i class="material-icons">add</i></NavLink>
                <TripList trips={trips}/>
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
