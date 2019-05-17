import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import Trips from './components/trips/Trips'
// PastTrips is no longer necessary. Decided to list all trips in single component
// import PastTrips from './components/trips/PastTrips'
import TripDetails from './components/trips/TripDetails'
import SignIn from './components/auth/SignIn'
import Register from './components/auth/Register'
import AddTrip from './components/trips/AddTrip'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={ Dashboard } />
          <Route path='/trips' component={ Trips } />
          {/* <Route path='/past' component={ PastTrips } /> */}
          <Route path='/trips/:id' component={ TripDetails } />
          <Route path='/signin' component={ SignIn } />
          <Route path='/register' component={ Register } />
          <Route path='/addtrip' component={ AddTrip } />

        </Switch>
      </div>

    </Router>
  );
}

export default App;
