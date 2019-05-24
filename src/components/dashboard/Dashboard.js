import React, { Component } from 'react';
// import { NavLink, } from 'react-router-dom';
import TripList from '../trips/TripList';
import Mapbox from './Mapbox';
import TripToggle from '../trips/TripToggle';
import { Modal, } from 'react-materialize';
import AddTrip from '../trips/AddTrip';

// translate today's date
let today = new Date();
let month = today.getUTCMonth() + 1; //months from 1-12
let day = today.getUTCDate();
let year = today.getUTCFullYear();
let todayDate = year + "-" + month + "-" + day;


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
        };
        console.log(this.props.trips)
    }

    static getDerivedStateFromProps(props, state){
        console.log('state', state)
        console.log('props',props)
        if(props.trips.length > 0 && !state.didSetTrips) {
            return {
                trips: props.trips,
                didSetTrips: true,
                viewableTrips: props.trips,
            }
        }else if(props.trips.length !== state.trips.length){ // had to add this to get Dashboard to update state after AddTrip modal created new trip
            return{
                trips: props.trips,
                viewableTrips: props.trips,
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
                        <a href={`#newtrip`} className={`modal-trigger addTrip btn-floating waves-effect waves-light`} >
                            <i className="material-icons">add</i>
                        </a>
                        <TripToggle 
                            past={this.state.pastTrips} 
                            future={this.state.futureTrips} 
                            changePast={this._onPastChange}
                            changeFuture={this._onFutureChange}
                            />

                        <TripList 
                            trips={viewableTrips}
                            tripDeselector={this._deSelectTrip} 
                            tripSelector={this._selectTripId} 
                            selectedTrip={this.state.selectedTripId}
                            updateAppDashboard={updateApp}
                            
                        />
                    </div>
                    <div id="mapbox" className='col s6 m10'>
                        <Mapbox 
                            trips={viewableTrips} 
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
        this._filterTrips
        )
        console.log('viewableTrips', this.state.viewableTrips)
    }

    _onFutureChange = () => {
        this.setState({
            futureTrips: !this.state.futureTrips
        },
        this._filterTrips
        
        )
        console.log('viewableTrips', this.state.viewableTrips)
    }
    _filterTrips = () => {
        let tripArray = []

        // if pastTrips is false
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
                let tripDate = trip.trip_date.split("T").shift();
                if (tripDate > todayDate) {
                    tripArray.push(trip)
                }
            })
        // if futureTrips is false
        }
        if (!this.state.futureTrips && this.state.pastTrips){
            //return only past trips
            this.props.trips.forEach(trip => {
                let tripDate = trip.trip_date.split("T").shift();
                if (tripDate < todayDate) {
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
}