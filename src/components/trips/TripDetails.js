import React from 'react';
import { Modal, } from 'react-materialize';
import axios from 'axios';
import M from 'materialize-css';
import moment from 'moment';
import Dropzone from "react-dropzone";
import Autosuggest from 'react-autosuggest';
import styled from 'styled-components';

const StyledWrapper = styled.div`
    & .react-autosuggest__input{
        font-size: 18px !important;
    }
    @media only screen and (min-width: 1020px){
        & .react-autosuggest__input{
            font-size: 30px !important;
        }
    }
    `;


export default class TripDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : this.props.name,
            value : this.props.name,
            date : this.props.date,
            details : this.props.details,
            photos : this.props.photos,
            lat : this.props.lat,
            lon : this.props.lon,
            deleteThisTrip : false,
            suggestions: [],
            response: [],
            files: [],
            deleteAPhoto: false,
            deleteMe: null,
            carouselShouldSpin: true,
        };
        this._updateDate.bind(this);
        this.carouselInstance = React.createRef();
    }
    componentDidMount(){
        M.Datepicker.init(document.getElementById(`editTripDate${this.props.id}`), {autoClose:true, onSelect:this._updateDate});
        if(this.state.photos && this.state.photos.length > 0) {
            
            this.setState({carouselShouldSpin: false,});
        }
    }
    componentWillUnmount(){
        clearTimeout(this.saving);
    }
    render(){
        setTimeout(() => {
            if(this.state.photos && this.state.photos.length > 0) {
            this.materializeCarouselInstance = M.Carousel.init(this.carouselInstance.current,{fullWidth: true, indicators: false});
        }}, 500);
        const { suggestions, files, photos, } = this.state;
        const inputProps = {
            placeholder: 'Choose a destination',
            value: this.state.value, 
            onChange: this.updateAutosuggestField
        };
        const renderSuggestion = (suggestion, { query, isHighlighted }) => {
            return(
            <div>
                {suggestion.place_name}
            </div>
            )
        }
        let {id, date, details, lat, lon} = this.props;
        const options = {onCloseStart : ()=>{this._saveChanges();}, onOpenEnd : ()=> {console.log(this.state.name, id)}};
        date = moment(date).format("MMM Do YYYY");
        let slides = null;
        if(photos && photos.length > 0){
            slides = photos.map((photo, i) => {
                return(
                    <a key={i} className="carousel-item" ><img src={`photos/${photo}`} alt='' /></a>
                )
            }) 
        }
        return (
            <Modal id="tripdetails" open={true} options={options}>
                <div className="modal-content">
                <div id='savingTrip'>
                    <p>Saving changes...</p>
                </div>
                <a className="btn-floating delete-trip-btn" title={this.state.deleteThisTrip ? 'undo': 'delete trip'} onClick={this._toggleDeleteTrip}><i className="material-icons">{this.state.deleteThisTrip ? 'undo':'delete'}</i></a>
                <span className={this.state.deleteThisTrip ? "grey darken-3 undodelete-tooltip" : "grey darken-3 tooltip-hidden" }>Undo Delete</span>
                    <span className='card-title'>
                    <StyledWrapper>
                        <Autosuggest
                                
                                suggestions={suggestions} // this.state.suggestions to select from
                                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} // where Axios and the filtering happens
                                onSuggestionsClearRequested={this.onSuggestionsClearRequested} // onBlur(-ish), clears the rendered suggestions
                                getSuggestionValue={this.getSuggestionValue} // selector for suggestion, drops into state of final value
                                renderSuggestion={renderSuggestion} // the div of suggestion below input field
                                inputProps={inputProps} // placeholder, final value, and the onChange function
                                highlightFirstSuggestion={true} // cues the user that they need to select one of these options
                                focusInputOnSuggestionClick={false} // when you take a suggestion, the input blurs
                                
                            />
                    </StyledWrapper>
                    </span>
                    <div className='card-action grey-text'>
                        <input type="text" id={`editTripDate${id}`} className="datepicker" defaultValue={date} ></input>
                    </div>
                    <div className="map-detail-wrapper">
                        <div className="mini-map">
                            <img alt="map" src={`https://www.mapquestapi.com/staticmap/v5/map?key=Rum6uC90qtUc0AkV3bXdLYhrlxdqGi3K&center=${this.state.lat||lat},${this.state.lon||lon}&size=@2x`}></img>
                        </div>
                        <p onBlur={(e)=>{this._updateDetails(e.target.textContent);}} contentEditable={true} suppressContentEditableWarning={true} >{details || "Click here to enter Trip Details"}</p>
                    </div>
                </div>
                    <Dropzone 
                                onDrop={this._onDrop} 
                                accept="image/*"   
                                minSize={0} 
                                maxSize={5242880} 
                                multiple
                            >
                                {({
                                getRootProps, 
                                getInputProps, 
                                isDragActive, 
                                isDragReject, 
                                isFileTooLarge,
                                }) => (
                                    <section className="container dragdrop center">
                                        <div className='dragdrop-div'{...getRootProps()}>
                                            <div className="btn-floating addtripphotobtn">
                                                <i className="material-icons ">add</i>
                                            </div>
                                            <input {...getInputProps()} />
                                            <p className='dragDrop-p'>
                                            {files.length > 0 ? <ul>{files.map(file=><li>{file.key}</li>)}</ul> : null}
                                            {files.length === 0 && !isDragActive && `Drag & Drop image files here to upload photos of your trip!`}
                                            {files.length === 0 && isDragActive && !isDragReject && "Drop it like it's hot!"}
                                            {files.length === 0 && isDragReject && "File type not accepted, sorry!"}
                                            {files.length === 0 && isFileTooLarge && (
                                                <div className="text-danger mt-2">
                                                    File is too large.
                                                </div>
                                            )}
                                            </p>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        <br />
                        <br />
                    { slides ?    
                            <div className="carousel-wrapper">                            
                                <div ref={this.carouselInstance} id="carousel" className="carousel carousel-slider">
                                    {slides}
                                </div> 
                                <div className="carousel-close" title="delete photo" onClick={this._deleteMe} >
                                    <i className="material-icons">delete</i>
                                </div>
                            </div>
                    : 
                        null
                    }
            </Modal>
        )
    }
    _saveChanges = () => {
        const {value, details, lat, lon} = this.state
        let date1 = document.getElementById(`editTripDate${this.props.id}`).value.toString() 
        const date = moment(date1, 'MMM Do YYYY').format("YYYY-MM-DD")
        const propsDate = moment(this.props.date).format("YYYY-MM-DD")
        const body = {
            trip_location : value,
            trip_date : date,
            lat,
            lon,
            trip_details : details,
        }
        if(this.state.deleteThisTrip){
            axios.delete(`trips/delete/${this.props.id}`)
            .then(() => this.props.updateAppDashboard())
        }
        if((value!==this.props.name)||(date!==propsDate)||(details!==this.props.details)){
            axios.post(`/trips/edit/${this.props.id}`, body)
            .then(() => this.props.updateAppDashboard())
        }
        this.props.shutTheDoorBehindYou();
    }
    _updateName = () => {

    }
    _editName = (e) => {
        this.setState({
            editName : true
        })
    }
    _updateDate = (d) => {
        const date = d.toString()
        document.getElementById(`editTripDate${this.props.id}`).value = date
        this._showSaving()
    }
    _editDate = (e) => {
        this.setState({
            editDate : true
        })
    }
    _updateDetails = (details) => {
        this.setState({details},
            this._showSaving)
    }
    _editDetails = (e) => {
        this.setState({
            editDetails : true
        })
    }
    _updatePhotos = (photos) => {
        this.setState({photos},
            this._showSaving)
    }
    _toggleDeleteTrip = () => {
        this.setState({deleteThisTrip : !this.state.deleteThisTrip},
            this._showSaving)
    }
    _getPhotos = async () => {
        const {data} = await axios.get(`/trips/photos/${this.props.id}`);
        const imgs = data.imgs
        this.setState({photos:imgs})
    }
    _removePulse = () => {
        document.getElementById("addTripPhotos").classList.remove("pulse")
    }
    _choosePicture = () => {
        document.getElementById("tripPhotoInput").click()
    }
    _showSaving = () => {
        const {name, details, photos, } = this.state
        let date = document.getElementById(`editTripDate${this.props.id}`).value.toString()
        date = moment(date).format("YYYY-MM-DD")
    
        if((name!==this.props.name) || (date!==this.props.date) || (details!==this.props.details) || (photos!==this.props.photos)){
            document.getElementById('savingTrip').style.display='inline'
            this.saving = setTimeout(function () {document.getElementById('savingTrip').style.display='none'}, 1000)
        }
    }
    geocodeSearch = async () => {
        let {data} = await axios.post(`/cors`, {location: this.state.location})
        this.setState({
            response: data.data.features,
            suggestions : data.data.features,
        }, () => {
            this.state.response.forEach(res => {
            })
        }
        )
    }
    getSuggestionValue = ({place_name, center}) => {
        const lat = center[1]
        const lon = center[0]
        this.setState({
            lat,
            lon,
        }, this._showSaving())
        return (place_name)
    };
    updateAutosuggestField = (event, { newValue }) => {
        this.setState({
            value: newValue,
            location: newValue,
        }, ()=>{this.geocodeSearch()});
        
    };
        getSuggestions = (value) => {
            const inputValue = value.trim().toLowerCase();
            const inputLength = inputValue.length;
            const suggestionArryOfObjects =  inputLength === 0 ? [] : (this.state.response.length > 0 ? (this.state.response.filter(lang =>{
                return lang.place_name.toLowerCase().slice(0, inputLength) === inputValue
            })) : []);
            
            return suggestionArryOfObjects.map(suggestion => suggestion.place_name)
        };
        onSuggestionsFetchRequested = ({ value }) => {
            this.setState({
                suggestions: this.getSuggestions(value)
            });
        };
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    _onDrop = async (files) => {
        let photoFormData = null;
        photoFormData = new FormData();
        files.forEach((file, i) => {
            photoFormData.append(`file${i}`,file);
        })
        photoFormData.append('tripId', this.props.id);
        const {data} = await axios.post('/photos', photoFormData, {headers:{'content-type':'multipart/form-data'}});
        const photos = data.trip_photos;
        this.setState({photos})
    }
    _deleteMe = async() => {
        const {photos,} = this.state
        const deleteMe = photos[this.materializeCarouselInstance.center]
        const {data} = await axios.delete(`/photos/${this.props.id}/${deleteMe}`);
        const newPhotos = data.photos;
        this.materializeCarouselInstance.destroy()
        this.setState({
            deleteAPhoto : false,
            deleteMe : null,
            photos: newPhotos,
            carouselShouldSpin: true,
        })
    }
}

