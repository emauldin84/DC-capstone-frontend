import React from 'react';
import Slider from './Slider';
import {Modal} from 'react-materialize';
import axios from 'axios';
import { variance } from '@babel/types';

// export default function TripDetails({id, name, date, details, lat, lon})

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
        };
    }
    render(){
        const {id, name, date, details, lat, lon} = this.props;
        const options = {onCloseStart : ()=>{this._saveChanges();}, onOpenEnd : ()=> {console.log(this.state.name, id)}};
        return (
            <Modal id={`${id}`} header={this.state.name} options={options}>
                <div className="modal-content">
                    <span className='card-title'>
                        <p onBlur={(e)=>{this._updateName(e.target.textContent);}} contentEditable={true} suppressContentEditableWarning={true} >{name}</p>
                    </span>
                    <div className='card-action grey-text'>
                        <div onBlur={(e)=>{this._updateDate(e.target.textContent);}} contentEditable={true} suppressContentEditableWarning={true} >{date}</div>
                    </div>
                    <p onBlur={(e)=>{this._updateDetails(e.target.textContent);}} contentEditable={true} suppressContentEditableWarning={true} >{details}</p>
                </div>
                {this.state.editPhotos?
                    <textarea onChange={(e)=>{this._updatePhotos(e.target.value)}} defaultValue={"Change your pictures!"} /> // this should be a FileUpload component
                    :
                    <Slider onClick={this._editPhotos} />
                }
            </Modal>
        )
    }
    _saveChanges = () => {
        this.setState({
            editPhotos : false,
        }, () => {
            const {name, date, details, photos, lat, lon} = this.state
            let shouldDashboardUpdate = false;
                // we need to POST to db as well as alert the Dashboard 
                // component that it's time to freshly render with the latest from DB
            const body = {
                trip_location : name,
                trip_date : date,
                lat,
                lon,
                trip_details : details,
                trip_photos : photos,
            }
            // if(name!==this.props.name){
            //     axios.post(`/trips/edit/${this.props.id}`, body)
            //     shouldDashboardUpdate = true;
            // }
            // if(date!==this.props.date){
            //     axios.post(`/trips/edit/${this.props.id}`, body)
            //     shouldDashboardUpdate = true;
            // }
            // if(details!==this.props.details){
            //     axios.post(`/trips/edit/${this.props.id}`, body)
            //     shouldDashboardUpdate = true;            
            // }
            // if(photos!==this.props.photos){
            //     axios.post(`/trips/edit/${this.props.id}`, body)
            //     shouldDashboardUpdate = true;            
            // }
            // if(shouldDashboardUpdate){
            //     this.props.updateApp()
            // }
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
    _updateDate = (date) => {
        this.setState({date})
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
}