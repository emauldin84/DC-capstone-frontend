import React from 'react'
import TripDetails from './TripDetails';

export default function TripList({trips, tripSelector, tripDeselector, selectedTrip}) {
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
                        {trips && trips.map(({id, trip_location, trip_date, trip_details, lat, lon}) => {
                            let selected = ''
                            selectedTrip === id ? selected = 'trip-list-item-hover' : selected = '';
                            return(
                                <li key={id} onClick={()=>tripSelector(id)} className='trip-list-item'>
                                    <TripDetails 
                                        name={trip_location}
                                        id={id}
                                        details={trip_details}
                                        date={trip_date}
                                        lat={lat}
                                        lon={lon}
                                    />
                                    <a href={`#${id}`} onMouseEnter={()=>{tripSelector(id)}} onMouseLeave={tripDeselector} className={`modal-trigger ${selected}`} style={{color:"black"}} >
                                        {trip_location}
                                    </a>
                                </li>
                            )
                        })}
                    
                    
                </ul>
            </div>
        </div>
    )
}
