import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import TripList from '../trips/TripList'
import Mapbox from './Mapbox';
import TripToggle from '../trips/TripToggle'


export default class Dashboard extends Component {
    render() {
        const { trips } = this.props
        return (
        <div className='dashboard section'>
            <div className='row'>
                <div className='col s3 m2'>
                    <NavLink  className='addTrip btn-floating waves-effect waves-light' to='/addtrip' title='add trip'><i className="material-icons">add</i></NavLink>
                    <TripToggle />
                    <TripList trips={trips}/>
                </div>
                <div id="mapbox" className='col s6 m10'>
                    <Mapbox trips={trips} />
                </div>
            </div>
        </div>
        )
    }
}
