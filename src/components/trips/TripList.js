import React from 'react';
import TripDetails from './TripDetails';


export default function TripList({selectedTrip, tripSelector, tripDeselector, updateAppDashboard, trips, clickedTrip}){
    return(
        <div className='trip-list section'>
            <ul className='trip-unordered-list'>
                    {trips && trips.map(({id, trip_location, trip_date, trip_details, lat, lon, photos}) => {
                        let selected = '';
                        selectedTrip === id ? selected = 'trip-list-item-hover' : selected = '';
                        return(
                            <li key={id} onClick={()=>clickedTrip(id)} onMouseEnter={()=>{tripSelector(id)}} onMouseLeave={tripDeselector} className={`trip-list-item `} style={{color:"black"}}>
                                    {trip_location}
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}

// const tripDetails = <TripDetails name={trip_location} id={id} details={trip_details} date={trip_date} lat={lat} lon={lon} photos={photos} updateApp={this.props.updateAppDashboard} />


// for className :: `modal-trigger ${selected}`