import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import TripList from '../trips/TripList'
import Mapbox from './Mapbox';
import {Modal, Button} from 'react-materialize';
// import TripToggle from '../trips/TripToggle'


export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTripId : null
        };
    }
    render() {
        const { trips } = this.props
        return (
        <div className='dashboard section'>
            <div className='row'>
                <div className='col s3 m2'>
                    <NavLink  className='addTrip btn-floating waves-effect waves-light' to='/addtrip' title='add trip'><i className="material-icons">add</i></NavLink>
                    {/* <TripToggle /> */}
                    <TripList tripSelector={this._selectTripId} trips={trips}/>
                </div>
                <div id="mapbox" className='col s6 m10'>
                    <Mapbox trips={trips} />
                </div>
            </div>
        </div>
        )
    }
    _selectTripId = (selectedTripId) => {
        this.setState({
            selectedTripId
        })
    }
    _deSelectTrip = () => {
        this.setState({
            selectedTripId : null
        })
    }
}
