import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Map from './Map'
import TripList from '../trips/TripList'

export default class Dashboard extends Component {
    render() {
        const { trips } = this.props
        return (
        <div className='dashboard section'>
            <div className='row'>
                <div className='col s3 m2'>
                    <NavLink  className='addTrip btn-floating waves-effect waves-light' to='/addtrip' title='add trip'><i class="material-icons">add</i></NavLink>
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
