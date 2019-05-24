import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Trips from './components/trips/Trips';
import TripDetails from './components/trips/TripDetails';
import SignIn from './components/auth/SignIn';
import Register from './components/auth/Register';
import AddTrip from './components/trips/AddTrip';
axios.defaults.withCredentials = true;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips : [],
    };
  }

  componentDidMount() {
    // call functions here to retrieve trip and user data?

    this.getTripsByUserId();

  }
  componentWillUnmount(){

  }

  render() {
    return (
        <div className="App">
          <Navbar user={this.props.user} clearState={this.props.handleSignOut} />
          <Dashboard trips={this.state.trips} updateApp={this.getTripsByUserId} />
        </div>
    );
  }

  getTripsByUserId = async () => {
    const response = await axios.get('/trips', {withCredentials: true})
    this.setState({
      trips: response.data
    })
  }

  getUserById = async () => {
    const response = await axios.get('/users', {withCredentials: true})
    
    this.setState({
      user: response.data
    })
  }

}
