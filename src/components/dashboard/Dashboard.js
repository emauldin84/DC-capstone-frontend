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
                    {/* <Map /> */}
                    {/* <Geocoder
                        accessToken='pk.eyJ1IjoiZW1hdWxkaW4iLCJhIjoiY2p2dmdhdjExMWMzMDQ5bDlwdzl0b2p1ZSJ9.HBj_nqaAQpYjoZx5vHOLOg'
                        onSelect=required function
                        onSuggest=optional function
                        source=optional string, default 'mapbox.places'
                        endpoint=optional string, default 'http://api.tiles.mapbox.com'
                        inputClass=optional string, default ''
                        inputPlaceholder=optional string, default 'Search'
                        resultClass=optional string, default ''
                        resultsClass=optional string, default ''
                        showLoader=optional string, default ''
                        inputPosition=optional string, default 'top', can be 'bottom'
                        resultFocusClass=optional string, default 'strong'
                        proximity=optional string, default '',
                        bbox=optional string, default '',
                        types=optional string, default '',
                        focusOnMount=optional bool, default true
    /> */}
                </div>
            </div>

        </div>
        )
    }
}
