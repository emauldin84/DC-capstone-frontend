import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import Dropzone from "react-dropzone";
import { DatePicker, Button, Modal, }from 'react-materialize';
import { gql } from 'apollo-boost'
import { compose, graphql } from 'react-apollo'

const addTripQuery = gql`
mutation {
    addTrip(
    trip_location: "Atlanta",
    trip_date: "1/1/1",
    lat: "89.11",
    lon: "-11.11",
    trip_details: "details and details",
    trip_photos: [
        "8_DSCF0578_1560969954035.jpg"
        ]
    ){
        trip_details
        trip_photos
    }
}
`

class AddTrip extends Component {
    constructor(props){
        super(props);
        this.state = {
            shouldDisplay: true,
            location: '',
            date: null,
            lat:null,
            lon:null,
            details: '',
            response: [],
            fileName: false,
            tripId:null,
            message:null,
            value: '',
            suggestions: [],
            photoFormData: [],
            files: [],
        };
    }
    componentWillUnmount(){
        this.props.comeBack();
    }
    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));
        const { value, suggestions } = this.state; 
        const inputProps = {
            placeholder: 'Choose a destination',
            value, 
            onChange: this.updateAutosuggestField
        };
        const renderSuggestion = (suggestion, { query, isHighlighted }) => {
            return(
            <div>
                {suggestion.place_name}
            </div>
            )
        }
        return (
            <Modal id={`newtrip`} className="Modal">
                <div className='container add-new-trip-container'>
                    <form onSubmit={this.handleSubmit} id="myform" className='white' method='post' encType='multipart/form-data' action='/upload'>
                        <h5 className='grey-text text-darken-3'>Add a New Trip</h5>
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
                        <div className='input-field'>
                            <label htmlFor='date' ></label>
                            <DatePicker type='text' id='date' placeholder='Date' className='datepicker' required onChange={this.handleDateChange}/>
                        </div>

                        {/* text input field */}
                        <div className="input-field">
                            <label htmlFor="details"></label>
                            <textarea id="details" className="materialize-textarea" placeholder='Trip Details / Itinerary'  onChange={this.handleChange}></textarea>
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
                                                {files.length === 0 && !isDragActive && `Upload photos for your trip!` }
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
                        {/* submit button */}
                        <div className='input-field'>
                            {this.state.lat && this.state.date?
                                <button data-dismiss="modal" onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} className='btn teal lighten-1 z-depth-1' type="submit" onClick={this.handleSubmit}>Submit</button>
                            :
                                <Button disabled={true} >Submit</Button>
                            }
                        </div>
                    </form>
                </div>
            </Modal>
        )
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }
    handleLocation = (e) => {
        this.setState({
            location: e.target.value,
        }, () => {
            this.geocodeSearch();
        })
    }
    handleDateChange = (e) => {
        this.setState({
            date: [e][0]
        }) 
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        const {location, date, lat, lon, details, photoFormData } = this.state
        const formData = {
            location,
            date,
            lat,
            lon,
            details,
        }
        const {data} =  await axios.post('/trips/add', formData)
        if(this.state.fileName){
            photoFormData.append('tripId', data.tripID.id)
            await axios.post('/photos', photoFormData, {headers:{'content-type':'multipart/form-data'}})
        }        
        this.props.hushModal()
        this.props.updateAppDashboard()
    }
    geocodeSearch = async () => {
        let {data} = await axios.post(`/cors`, {location: this.state.location})
        this.setState({
            response: data.data.features,
            suggestions : data.data.features,
        })
    }
    getSuggestionValue = ({place_name, center}) => {
        const lat = center[1]
        const lon = center[0]
        this.setState({
            lat,
            lon,
        })
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
    _onMouseLeave = ({target}) => {
        target.classList.remove("lighten-2");
        target.classList.add("lighten-1");
    }
    _onMouseEnter = ({target}) => {
        target.classList.remove("lighten-1");
        target.classList.add("lighten-2");
    }
    _onDrop = async (files) => {
        let photoFormData = new FormData();
        files.forEach((file, i) => {
            photoFormData.append(`file${i}`,file)
        })
        this.setState({photoFormData, fileName:true, files, })
    }
}

export default graphql(addTripQuery)(AddTrip)