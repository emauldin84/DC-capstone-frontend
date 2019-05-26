import React, { Component } from 'react';
import moment from 'moment'

import TripList from '../trips/TripList';
import Mapbox from './Mapbox';
import TripToggle from '../trips/TripToggle';
import { Modal, } from 'react-materialize';
import AddTrip from '../trips/AddTrip';
import SearchBar from '../trips/SearchBar'

// translate today's date
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
            pastTrips: true,
            futureTrips: true,
            trips: [],
            viewableTrips: [],
            didSetTrips: false,
            showModal:true,
            searchWord: '',
        };
        // console.log(this.props.trips)
    }

    static getDerivedStateFromProps(props, state){
        // console.log('state', state)
        // console.log('props', props)
        if(props.trips.length > 0 && !state.didSetTrips) {
            return {
                trips: props.trips,
                didSetTrips: true,
                viewableTrips: props.trips,
            }
        }else if(props.trips.length !== state.trips.length){ // had to add this to get Dashboard to update state after AddTrip modal created new trip
            let tripArray = []

                // if both are true
                if (state.pastTrips && state.futureTrips) {
                    // return only future trips
                    props.trips.forEach(trip => {
                            tripArray.push(trip)
                    })
                }
                // if pastTrips is false
                if (!state.pastTrips && state.futureTrips) {
                    // return only future trips
                    props.trips.forEach(trip => {
                        let tripDate = moment(trip.trip_date.split("T").shift()).format();
                        if (tripDate > today) {
                            tripArray.push(trip)
                        }
                    })
                // if futureTrips is false
                }
                if (!state.futureTrips && state.pastTrips){
                    //return only past trips
                    props.trips.forEach(trip => {
                        let tripDate = moment(trip.trip_date.split("T").shift()).format();
                        if (tripDate < today) {
                            tripArray.push(trip)
                        }
                    })
                // if both are false
                }
                if (!state.futureTrips && !state.pastTrips){
                    tripArray= [];
                }

            return{
                trips: props.trips,
                viewableTrips: tripArray,
            }
        }else{
            return {
                trips: props.trips
            }
        }
    } 


    render() {
        // console.log(this.props.trips[0] ? this.props.trips[0].trip_date : null)
        const { updateApp, trips } = this.props;
        const { viewableTrips, } = this.state;
        return (
            <div className='dashboard section'>
                <div className='row'>
                    <div className='col s3 m2'>
                        {/* <NavLink  className='addTrip btn-floating waves-effect waves-light' to='/addtrip' title='add trip'></NavLink> */}
                        {this.state.showModal?
                        <AddTrip hushModal={this._goAwayModal} comeBack={this._comeBackModal} updateAppDashboard={updateApp} />
                        :
                        null
                        }
                        <a href={`#newtrip`} title='add new trip' className={trips.length <= 0 ? "pulse modal-trigger addTrip btn-floating waves-effect waves-light" : `modal-trigger addTrip btn-floating waves-effect waves-light`}>
                            <i className="pulse material-icons addtrip" >add</i>
                        </a>
                            <span className={trips.length <= 0 ? "grey darken-3 tooltip" : "grey darken-3 tooltip-hidden" }>Click me to add your first trip!</span>
                        <TripToggle 
                            past={this.state.pastTrips} 
                            future={this.state.futureTrips} 
                            changePast={this._onPastChange}
                            changeFuture={this._onFutureChange}
                            />
                        <SearchBar 
                            search={this._searchHandler}
                            />
                        <TripList 
                            trips={viewableTrips.filter(searchingFor(this.state.searchWord)).map(trip => trip)}
                            tripDeselector={this._deSelectTrip} 
                            tripSelector={this._selectTripId} 
                            selectedTrip={this.state.selectedTripId}
                            updateAppDashboard={updateApp}
                            
                        />
                    </div>
                    <div id="mapbox" className='col s9 m10'>
                        <Mapbox 
                            trips={viewableTrips.filter(searchingFor(this.state.searchWord)).map(trip => trip)} 
                            tripDeselector={this._deSelectTrip} 
                            tripSelector={this._selectTripId} 
                            selectedTrip={this.state.selectedTripId}
                            updateAppDashboard={updateApp}
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
        // console.log('viewableTrips', this.state.viewableTrips)
    }

    _onFutureChange = () => {
        this.setState({
            futureTrips: !this.state.futureTrips
        },
        this._filterTripsByDate
        
        )
        // console.log('viewableTrips', this.state.viewableTrips)
    }

    _filterTripsByDate = () => {
        let tripArray = []

        // if both are true
        if (this.state.pastTrips && this.state.futureTrips) {
            // return only future trips
            this.props.trips.forEach(trip => {
                    tripArray.push(trip)
            })
        }
        // if pastTrips is false
        if (!this.state.pastTrips && this.state.futureTrips) {
            // return only future trips
            this.props.trips.forEach(trip => {
                let tripDate = moment(trip.trip_date.split("T").shift()).format();
                if (tripDate > today) {
                    tripArray.push(trip)
                }
            })
        // if futureTrips is false
        }
        if (!this.state.futureTrips && this.state.pastTrips){
            //return only past trips
            this.props.trips.forEach(trip => {
                let tripDate = moment(trip.trip_date.split("T").shift()).format();
                if (tripDate < today) {
                    tripArray.push(trip)
                }
            })
        // if both are false
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
        // console.log(this.state.searchWord)
    } 
}