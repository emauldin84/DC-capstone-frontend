import React, {Component} from 'react';
import MapGL, { Marker } from 'react-map-gl';
import TripDetails from '../trips/TripDetails';
import moment from 'moment'
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
      let today = moment(new Date()).format();
      // console.log('moment:', today)
      
      const arrayOfMarkers = trips && trips.map(({id, trip_location, trip_date, trip_details, lat, lon, photos}) => {
        let selected = '';
        this.props.selectedTrip === id ? selected = 'fa-map-pin-hover' : selected = '';
        // translate trip date
        let tripDate = moment(trip_date.split("T").shift()).format()
        // console.log('tripDate',tripDate)
        return(
          <div key={id}>
            <TripDetails
            name={trip_location}
            id={id}
            details={trip_details}
            date={trip_date}
            lat={lat}
            lon={lon}
            photos={photos}
            updateApp={this.props.updateAppDashboard}
            />
            <a href={`#${id}`} className="modal-trigger" style={{color:"black"}} onMouseEnter={()=>{this.props.tripSelector(id)}} onMouseLeave={this.props.tripDeselector}>
              <Marker
                latitude={parseFloat(lat)}
                longitude={parseFloat(lon)} 
                offsetTop={-12}
                key={id}
                >
                { tripDate > today ? <i style={{color:"blue"}} className={`fas fa-map-pin ${selected}`}></i> : <i style={{color:"red"}} className={`fas fa-map-pin ${selected}`}></i> }
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