import React, {Component} from 'react';
import MapGL, { Marker } from 'react-map-gl';
const TOKEN = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: 0,
        zoom: 0.5,
        bearing: 0,
        pitch: 0,
        width: 500,
        height: 500,
      }
    };
  }
  componentDidMount(){
    this._assignMapDimensions();
    window.addEventListener('resize', this._assignMapDimensions);
  }


render() {
    const {viewport} = this.state;
    const { trips } = this.props
    const arrayOfMarkers = trips && trips.map((trip,i) => {
      console.log(trip);
      return(
        <Marker
          latitude={parseFloat(trip.lat)}
          longitude={parseFloat(trip.lon)} 
          offsetTop={-12}
          key={i}
        >
          <i style={{color:"white"}} className="fas fa-map-pin"></i>
        </Marker>
      )});

return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v8"
        onViewportChange={this._onChangeHandler}
        mapboxApiAccessToken={TOKEN}>
        {arrayOfMarkers}
      </MapGL>
    );
  }
  _onChangeHandler = (viewport) => {
    this.setState({
      viewport: {
        ...viewport,
      }
    });
  }
  _assignMapDimensions = () => {
    const width = document.getElementById("mapbox").offsetWidth;
    const height = document.getElementById("mapbox").offsetHeight;
    this.setState({
      viewport: {
        ...this.state.viewport,
        width,
        height,
      }
    });
  }
}