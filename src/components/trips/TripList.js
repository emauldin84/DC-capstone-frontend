import React from 'react';
import TripDetails from './TripDetails';

class TripList extends React.Component{
    constructor(props){
        super(props);
        const {trips,} = this.props;
        this.state = {
            trips: this.props.trips
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (props.trips !== state.trips) {
            state.trips.forEach((trip)=>{
                console.log(trip.trip_location);
            })
            return {
            trips: props.trips,
            };
        }
        return null;
    }
    render(){
        const {selectedTrip, tripSelector, tripDeselector, updateAppDashboard, } = this.props;
        const {trips,} = this.state;
        // console.log('trips',trips)

        return(
            <div className='trip-list section'>
                <ul className='trip-unordered-list'>
                        {trips && trips.map(({id, trip_location, trip_date, trip_details, lat, lon, photos}) => {
                            let selected = '';
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
                                        photos={photos}
                                        updateApp={updateAppDashboard}
                                    />
                                    <a href={`#${id}`} onClick={()=>console.log("TripList id:", id)} onMouseEnter={()=>{tripSelector(id)}} onMouseLeave={tripDeselector} className={`modal-trigger ${selected}`} style={{color:"black"}} >
                                        {trip_location}
                                    </a>
                                </li>
                            )
                        })}
                </ul>
            </div>
        )
    }
}
export default TripList;