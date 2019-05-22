import React, {Component} from 'react';
import MapGL, { Marker } from 'react-map-gl';
const TOKEN = 'pk.eyJ1IjoiZW1hdWxkaW4iLCJhIjoiY2p2dmdhdjExMWMzMDQ5bDlwdzl0b2p1ZSJ9.HBj_nqaAQpYjoZx5vHOLOg';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.785164,
        longitude: 0,
        zoom: 1.25,
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
        className='mapbox-gl'
        {...viewport}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v9"
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