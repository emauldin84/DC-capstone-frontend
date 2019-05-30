import React, { Component } from 'react';
import moment from 'moment'
import TripList from '../trips/TripList';
import Mapbox from './Mapbox';
import TripToggle from '../trips/TripToggle';
import AddTrip from '../trips/AddTrip';
import SearchBar from '../trips/SearchBar';
import TripDetails from '../trips/TripDetails';
import axios from 'axios';

let today = moment(new Date()).format();

function searchingFor(searchWord) {
    return function(trip) {

        return trip.trip_location.toLowerCase().includes(searchWord.toLowerCase()) || !searchWord;
    }
}

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTripId : null,
            clickedTrip : null,
            pastTrips: true,
            futureTrips: true,
            trips: [],
            viewableTrips: [],
            didSetTrips: false,
            showModal:true,
            searchWord: '',
        };
    }

    static getDerivedStateFromProps(props, state){
        if(props.trips.length > 0 && !state.didSetTrips) {
            return {
                trips: props.trips,
                didSetTrips: true,
                viewableTrips: props.trips,
            }
        }else if((props.trips.length !== state.trips.length)||(!state.pastTrips || !state.futureTrips)){
            let tripArray = [];
                if (state.pastTrips && state.futureTrips) {
                    props.trips.forEach(trip => {
                            tripArray.push(trip);
                    });
                }
                if (!state.pastTrips && state.futureTrips) {
                    props.trips.forEach(trip => {
                        let tripDate = moment(trip.trip_date.split("T").shift()).format();
                        if (tripDate > today) {
                            tripArray.push(trip);
                        }
                    });
                }
                if (!state.futureTrips && state.pastTrips){
                    props.trips.forEach(trip => {
                        let tripDate = moment(trip.trip_date.split("T").shift()).format();
                        if (tripDate < today) {
                            tripArray.push(trip);
                        }
                    });
                }
                if (!state.futureTrips && !state.pastTrips){
                    tripArray= [];
                }
            return{
                trips: props.trips,
                viewableTrips: tripArray,
            };
        }else{
            return {
                trips: props.trips,
                viewableTrips : props.trips,
            };
        }
    } 
    render() {
        const { updateApp, trips } = this.props;
        const { viewableTrips, clickedTrip, } = this.state;
        let photos = null;
        if(clickedTrip){
            if(clickedTrip.trip_photos){
            photos = clickedTrip.trip_photos.map(photo => {
                return photo;
            });
        }}
        const tripDetails = clickedTrip ? 
            <TripDetails 
                name={clickedTrip.trip_location} 
                id={clickedTrip.id} 
                shutTheDoorBehindYou={this._clearClickedTrip} 
                details={clickedTrip.trip_details} 
                date={clickedTrip.trip_date} 
                lat={clickedTrip.lat} 
                lon={clickedTrip.lon} 
                photos={photos} 
                updateAppDashboard={this.props.updateApp} 
            /> 
            : 
            null;        
        return (
            <div className='dashboard'>
                <div className='dashboard-map-n-tools'>
                    <div className='dashboard-tools'>
                            {this.state.showModal?
                            <AddTrip hushModal={this._goAwayModal} comeBack={this._comeBackModal} updateAppDashboard={updateApp} />
                            :
                            null
                            }
                        <div className='addtrip-searchtrip'>
                            <a href={`#newtrip`} title='add new trip' className={trips.length <= 0 ? "pulse modal-trigger addTrip btn-floating waves-effect waves-light" : `modal-trigger addTrip btn-floating waves-effect waves-light`}>
                                <i className="pulse material-icons addtrip" >add</i>
                            </a>
                                <span className={trips.length <= 0 ? "grey darken-3 tooltip" : "grey darken-3 tooltip-hidden" }>Click me to add your first trip!</span>
                                {trips.length <= 0 ? null : 
                                <SearchBar 
                                search={this._searchHandler}
                                />}
                        </div>
                        {tripDetails}
                        <div className="dashboard-toggle-list">
                            {trips.length <= 0 ? null :
                            <TripToggle 
                                past={this.state.pastTrips} 
                                future={this.state.futureTrips} 
                                changePast={this._onPastChange}
                                changeFuture={this._onFutureChange}
                                />}
                            
                            {trips.length <= 0 ? null :
                            <TripList 
                                trips={viewableTrips.filter(searchingFor(this.state.searchWord)).map(trip => trip)}
                                tripDeselector={this._deSelectTrip} 
                                tripSelector={this._selectTripId} 
                                selectedTrip={this.state.selectedTripId}
                                updateAppDashboard={updateApp}
                                clickedTrip={this._clickedOnTrip}
                                
                            />}
                        </div>
                    </div>
                    <div id="mapbox" className=''>
                        <Mapbox 
                            trips={viewableTrips.filter(searchingFor(this.state.searchWord)).map(trip => trip)} 
                            tripDeselector={this._deSelectTrip} 
                            tripSelector={this._selectTripId} 
                            selectedTrip={this.state.selectedTripId}
                            updateAppDashboard={updateApp}
                            clickedTrip={this._clickedOnTrip}
                        />
                    </div>
                </div>
            </div>
        )
    }
    _goAwayModal = () => {
        this.setState({showModal:false})
    }
    _comeBackModal = () => {
        this.setState({showModal:true})
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
    _onPastChange = () => {
        this.setState({
            pastTrips: !this.state.pastTrips
        },
        this._filterTripsByDate
        )
    }

    _onFutureChange = () => {
        this.setState({
            futureTrips: !this.state.futureTrips
        },
        this._filterTripsByDate
        )
    }

    _filterTripsByDate = () => {
        let tripArray = []
        if (this.state.pastTrips && this.state.futureTrips) {
            this.props.trips.forEach(trip => {
                    tripArray.push(trip)
            })
        }
        if (!this.state.pastTrips && this.state.futureTrips) {
            this.props.trips.forEach(trip => {
                let tripDate = moment(trip.trip_date.split("T").shift()).format();
                if (tripDate > today) {
                    tripArray.push(trip)
                }
            })
        }
        if (!this.state.futureTrips && this.state.pastTrips){
            this.props.trips.forEach(trip => {
                let tripDate = moment(trip.trip_date.split("T").shift()).format();
                if (tripDate < today) {
                    tripArray.push(trip)
                }
            })
        }
        if (!this.state.futureTrips && !this.state.pastTrips){
            tripArray= [];
        }
        this.setState({
            viewableTrips: tripArray,
        })
    }
    _searchHandler = (e) => {
        this.setState({
            searchWord: e.target.value
        })
    } 
    _clickedOnTrip = async(clickedTripId) => {
        const {data} = await axios.get(`/trips/${clickedTripId}`)
        const {clickedTrip} = data
        this.setState({clickedTrip})
    }
    _clearClickedTrip = () => {
        this.setState({clickedTrip:null})
    }
}