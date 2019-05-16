import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import FutureTrips from './components/trips/FutureTrips'
import PastTrips from './components/trips/PastTrips'
import TripDetails from './components/trips/TripDetails'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={ Dashboard } />
          <Route path='/future' component={ FutureTrips } />
          <Route path='/past' component={ PastTrips } />
          <Route path='/trip/:id' component={ TripDetails } />

        </Switch>
      </div>

    </Router>
  );
}

export default App;
