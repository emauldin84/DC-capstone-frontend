import React from 'react'

export default function TripList({trips}) {
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
                    
                        {trips && trips.map(trip => {
                            return(
                                <li key={trip.id} className='trip-list-item'>
                                {trip.trip_location}
                                </li>
                            )
                        })}
                    
                    
                </ul>
            </div>
        </div>
    )
}
