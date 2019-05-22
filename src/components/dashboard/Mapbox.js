import React, {Component} from 'react';
import MapGL, { Marker } from 'react-map-gl';
import TripDetails from '../trips/TripDetails';
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
      
      // translate today's date
      let today = new Date();
      let month = today.getUTCMonth() + 1; //months from 1-12
      let day = today.getUTCDate();
      let year = today.getUTCFullYear();
      let todayDate = year + "-" + month + "-" + day;
      
      const arrayOfMarkers = trips && trips.map((trip,i) => {
        let tripDate = trip.trip_date.split("T").shift()
        console.log('trip date',tripDate)
        console.log('today',today)
        return(
          <div key={trip.id}>
            <TripDetails 
            name={trip.trip_location}
            id={trip.id}
            details={trip.trip_details}
            date={trip.trip_date}
            lat={trip.lat}
            lon={trip.lon}
            />
            <a href={`#${trip.id}`} className="modal-trigger" style={{color:"black"}} >
              <Marker
                latitude={parseFloat(trip.lat)}
                longitude={parseFloat(trip.lon)} 
                offsetTop={-12}
                key={i}
                >
                { tripDate > todayDate ? <i style={{color:"blue"}} className="fas fa-map-pin"></i> : <i style={{color:"red"}} className="fas fa-map-pin"></i> }
              </Marker>
            </a>
          </div>
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