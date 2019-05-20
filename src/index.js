import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


// mapboxgl.accessToken = 'pk.eyJ1IjoiZW1hdWxkaW4iLCJhIjoiY2p2dmdhdjExMWMzMDQ5bDlwdzl0b2p1ZSJ9.HBj_nqaAQpYjoZx5vHOLOg';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
