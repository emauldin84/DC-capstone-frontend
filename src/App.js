import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Trips from './components/trips/Trips';
// PastTrips is no longer necessary. Decided to list all trips in single component
// import PastTrips from './components/trips/PastTrips';
import TripDetails from './components/trips/TripDetails';
import SignIn from './components/auth/SignIn';
import Register from './components/auth/Register';
import AddTrip from './components/trips/AddTrip';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trips:[ 
        {
          'location': 'Atlanta, Georgia, United States',
          'date': '2013-06-01',
          'lat': '33.7490',
          'lon': '84.3880', 
          'tripDetails': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
          'tripPhotos': 'file/path/goes/here',
          'userId': 1
        },
      ]
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' 
              render={(props) =>
                <Dashboard {...props} trips={this.state.trips}/>}
                />

            <Route exact path='/trips'
              render={(props) =>
                <Trips {...props} trips={this.state.trips}/>}
                />

            <Route path='/trips/:id' component={ TripDetails } />
            <Route path='/signin' component={ SignIn } />
            <Route path='/register' component={ Register } />
            <Route path='/addtrip' component={ AddTrip } />
  
          </Switch>
        </div>
  
      </Router>
    );
  }

}

export default App;



