import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import './App.css';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
axios.defaults.withCredentials = true;

const client = new ApolloClient({uri: 'http://localhost:31337/graphql'})

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trips : [],
    };
  }
  componentDidMount() {
    this.getTripsByUserId();
  }
  render() {
    return (
        <div className="App">
          <ApolloProvider client={client}>
            <Navbar user={this.props.user} clearState={this.props.handleSignOut} updateLanding={this.props.updateLanding} />
            <Dashboard trips={this.state.trips} updateApp={this.getTripsByUserId} />
          </ApolloProvider>
        </div>
    );
  }
  getTripsByUserId = async () => {
    const {data} = await axios.get('/trips', {withCredentials: true})
    this.setState({
      trips: data
    })
  }
  getUserById = async () => {
    const {data} = await axios.get('/users', {withCredentials: true})
    this.setState({
      user: data
    })
  }
}
