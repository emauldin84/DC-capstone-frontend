import React from 'react';
export default function TripList({selectedTrip, tripSelector, tripDeselector, trips, clickedTrip}){
    return(
        <div className='trip-list'>
            <ul className='trip-unordered-list'>
                    {trips && trips.map(({id, trip_location, }) => {
                        let selected = '';
                        selectedTrip === id ? selected = 'trip-list-item-hover' : selected = '';
                        return(
                            <li key={id} onClick={()=>clickedTrip(id)} onMouseEnter={()=>{tripSelector(id)}} onMouseLeave={tripDeselector} className={`trip-list-item ${selected} `} style={{color:"black"}}>
                                    {trip_location}
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
}