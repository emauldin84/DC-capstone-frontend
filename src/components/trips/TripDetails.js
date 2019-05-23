import React from 'react';
import Slider from './Slider';
import {Modal} from 'react-materialize';
import axios from 'axios';

// export default function TripDetails({id, name, date, details, lat, lon})

export default class TripDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            editName : false, // changing the location?
            name : this.props.name,
            editDate : false, // changing the date?
            date : this.props.date,
            editDetails : false, // changing the details?
            details : this.props.deatils,
            editPhotos : false, // changing the photos?
            photos : this.props.photos,
        };
    }
    
    render(){
        const {id, name, date, details, lat, lon} = this.props;
        const options = {onCloseStart : ()=>{this._saveChanges();}};
        return (
            <Modal id={`${id}`} header={this.state.name} options={options}>
                <div className="modal-content">
                    <span className='card-title'>
                        {this.state.editName?
                            <textarea onChange={(e)=>{this._updateName(e.target.value)}} defaultValue={name} /> // this will have to turn into an Autocomplete component
                            :
                            <p onClick={this._editName}>{name}</p>
                        } - id:{id}</span>
                        <div className='card-action grey-text'>
                            {this.state.editDate?
                            <textarea onChange={(e)=>{this._updateDate(e.target.value)}} defaultValue={date} /> // should be a Date picker
                            :
                            <div onClick={this._editDate}>{date}</div>
                            }
                        </div>
                    {this.state.editDetails?
                        <textarea onChange={(e)=>{this._updateDetails(e.target.value)}} defaultValue={details} style={{height:"100%"}} />
                        :
                        <p onClick={this._editDetails}>{details}</p>
                    }
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
            editName : false, 
            editDate : false, 
            editDetails : false, 
            editPhotos : false,
        }, () => {
            const {name, date, details, photos} = this.state
            let shouldDashboardUpdate = false;
                // we need to POST to db as well as alert the Dashboard 
                // component that it's time to freshly render with the latest from DB
            if(name!==this.props.name){
                // axios post
                axios.post(`/trips/edit/${this.props.id}`)
                console.log("sent post");
                shouldDashboardUpdate = true;
            }
            if(date!==this.props.date){
                // axios post
                shouldDashboardUpdate = true;
            }
            if(details!==this.props.details)
            {
                // axios post
                shouldDashboardUpdate = true;            
            }
            if(photos!==this.props.photos){
                // axios post
                shouldDashboardUpdate = true;            
            }
            if(shouldDashboardUpdate){
                this.props.updateApp()
            }
        })
        
    }
    _updateName = (name) => {
        this.setState({name})
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