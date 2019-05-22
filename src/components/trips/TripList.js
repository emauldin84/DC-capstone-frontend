import React from 'react'
import TripDetails from './TripDetails';

export default function TripList({trips, tripSelector}) {
    return (
        <div>
            <div className='trip-list section'>
                <ul>
                    {/* <li>Atlanta, GA</li>
                    <li>Cape Town, South Africa</li>
                    <li>Paris, France</li>
                    <li>Tokyo, Japan</li>
                    <li>London, England</li>
                    <li>San Francisco, California</li> */}
                    <div>
                    </div>
                        {trips && trips.map(trip => {
                            return(
                                <li key={trip.id} onClick={()=>tripSelector(trip.id)} className='trip-list-item'>
                                    <TripDetails 
                                        name={trip.trip_location}
                                        id={trip.id}
                                        details={trip.trip_details}
                                        date={trip.trip_date}
                                        lat={trip.lat}
                                        lon={trip.lon}
                                    />
                                    <a href={`#${trip.id}`} className="modal-trigger" style={{color:"black"}} >
                                        {trip.trip_location}
                                    </a>
                                </li>
                            )
                        })}
                    
                    
                </ul>
            </div>
        </div>
    )
}
