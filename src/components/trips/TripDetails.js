import React from 'react';
import Slider from './Slider';
import {Modal} from 'react-materialize';

// export default function TripDetails({id, name, date, details, lat, lon})

export default class TripDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            header : this.props.name,
            editName : false, // changing the location?
            editDate : false, // changing the date?
            editDetails : false, // changing the details?
            editPhotos : false, // changing the photos?
        };
    }
    
    render(){
        const {id, name, date, details, lat, lon} = this.props;
        const options = {onCloseEnd : ()=>{this._saveChanges();}};
        return (
            <Modal id={`${id}`} header={this.state.header} options={options}>
                <div className="modal-content">
                    <span className='card-title'>
                        {this.state.editName?
                            <textarea onChange={(e)=>{this._updateHeader(e.target.value)}} value={name} /> // this will have to turn into an Autocomplete component
                            :
                            <div onClick={this._editName}>{name}</div>
                        } - id:{id}</span>
                        <div className='card-action grey-text'>
                            {this.state.editDate?
                            <textarea value={date} /> // should be a Date picker
                            :
                            <div onClick={this._editDate}>{date}</div>
                            }
                        </div>
                    {this.state.editDetails?
                        <textarea value={details} style={{height:"100%"}} />
                        :
                        <p onClick={this._editDetails}>{details}</p>
                    }
                </div>
                {this.state.editPhotos?
                    <textarea value={"Change your pictures!"} /> // this should be a FileUpload component
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
        })
        // next step: check if state !== props for the trip info - 
        // if so, we need to POST to db as well as alert the Dashboard 
        // component that it's time to freshly render with the latest from DB
    }
    _updateHeader = (header) => {
        this.setState({header})
    }
    _editName = (e) => {
        this.setState({
            editName : true
        })
    }
    _editDate = (e) => {
        this.setState({
            editDate : true
        })
    }
    _editDetails = (e) => {
        this.setState({
            editDetails : true
        })
    }
    _editPhotos = (e) => {
        this.setState({
            editPhotos : true
        })
    }
}