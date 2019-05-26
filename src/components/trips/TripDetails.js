import React from 'react';
import Slider from './Slider';
import { Modal, } from 'react-materialize';
import axios from 'axios';
import M from 'materialize-css';


export default class TripDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : this.props.name,
            date : this.props.date,
            details : this.props.details,
            editPhotos : false, // changing the photos?
            photos : this.props.photos,
            lat : this.props.lat,
            lon : this.props.lon,
            deleteThisTrip : false,
        };
        this._updateDate.bind(this);
    }
    componentDidMount(){
        M.Datepicker.init(document.getElementById(`editTripDate${this.props.id}`), {autoClose:true, onSelect:this._updateDate});
    }
    render(){
        const {id, name, date, details, lat, lon} = this.props;
        const options = {onCloseStart : ()=>{this._saveChanges();}, onOpenEnd : ()=> {console.log(this.state.name, id)}};
        return (
            <Modal id={`${id}`} options={options}>
                <div className="modal-content">
                    <span className='card-title'>
                        <h2 onBlur={(e)=>{this._updateName(e.target.textContent);}} contentEditable={true} suppressContentEditableWarning={true} >{name}</h2>
                    </span>
                    <div className='card-action grey-text'>
                        {/* <div onBlur={(e)=>{this._updateDate(e.target.textContent);}} contentEditable={true} suppressContentEditableWarning={true} >{date}</div> */}
                        <input type="text" id={`editTripDate${id}`} className="datepicker" defaultValue={date} ></input>
                    </div>
                    <p onBlur={(e)=>{this._updateDetails(e.target.textContent);}} contentEditable={true} suppressContentEditableWarning={true} >{details}</p>

                </div>
                {this.state.editPhotos?
                    <textarea onChange={(e)=>{this._updatePhotos(e.target.value)}} defaultValue={"Change your pictures!"} /> // this should be a FileUpload component
                    :
                    <Slider onClick={this._editPhotos} />
                }
                <div className="btn" onClick={this._toggleDeleteTrip}>
                    {this.state.deleteThisTrip? `Undo`:`Delete Trip`}
                </div>
            </Modal>
        )
    }
    _saveChanges = () => {
        this.setState({
            editPhotos : false,
        }, () => {
            // we need to POST to db as well as alert the Dashboard 
            // component that it's time to freshly render with the latest from DB
            const {name, details, photos, lat, lon} = this.state
            const date = document.getElementById(`editTripDate${this.props.id}`).value.toString()
            const body = {
                trip_location : name,
                trip_date : date,
                lat,
                lon,
                trip_details : details,
                trip_photos : photos,
            }
            if(this.state.deleteThisTrip){
                axios.delete(`trips/delete/${this.props.id}`)
                .then(this.props.updateApp)
            }
            if((name!==this.props.name)||(date!==this.props.date)||(details!==this.props.details)||(photos!==this.props.photos)){
                console.log("prop id: ", this.props.id);
                axios.post(`/trips/edit/${this.props.id}`, body)
                // .then(({r}) => {console.log(destination)})
                .then(this.props.updateApp)
            }
        })
        
    }
    _updateName = (name) => {
        this.setState({name})
        // this will also have to update lat/lon in state too
    }
    _editName = (e) => {
        this.setState({
            editName : true
        })
    }
    _updateDate = (d) => {
        const date = d.toString()
        document.getElementById(`editTripDate${this.props.id}`).value = date
    }
    _editDate = (e) => {
        this.setState({
            editDate : true
        })
    }
    _updateDetails = (details) => {
        this.setState({details})
    }
    _editDetails = (e) => {
        this.setState({
            editDetails : true
        })
    }
    _updatePhotos = (photos) => {
        this.setState({photos})
    }
    _editPhotos = (e) => {
        this.setState({
            editPhotos : true
        })
    }
    _toggleDeleteTrip = () => {
        this.setState({deleteThisTrip : !this.state.deleteThisTrip})
    }
}