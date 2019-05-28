import React from 'react';
// import SliderWrapper from './SliderWrapper';
import { Modal, Slider, Slide, Caption, } from 'react-materialize';
import axios from 'axios';
import M from 'materialize-css';
import moment from 'moment';
import Dropzone, {useDropzone} from "react-dropzone";
import Autosuggest from 'react-autosuggest';


export default class TripDetails extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : this.props.name,
            date : this.props.date,
            details : this.props.details,
            editPhotos : false, // changing the photos?
            photos : this.props.photos, // props.photos is returning an object, need to format it as an array to play nice with slides
            lat : this.props.lat,
            lon : this.props.lon,
            deleteThisTrip : false,
            value: this.props.name,
            suggestions: [],
            response: [],
            files: [],
        };
        this._updateDate.bind(this);
    }
    componentDidMount(){
        M.Datepicker.init(document.getElementById(`editTripDate${this.props.id}`), {autoClose:true, onSelect:this._updateDate});
        // this._getPhotos();
    }
    componentWillUnmount(){
        // console.log("TripDetails, signing off...")
        // const elem = document.getElementById(`editTripDate${this.props.id}`);
        // const instance = M.Datepicker.getInstance(elem);
        // instance.destroy();
    }
    render(){
        console.log('this.state.location',this.state.location)
        const { value, suggestions, files, photos,  } = this.state; // a little destructuring for conveinence 
        const inputProps = {
            placeholder: 'Choose a destination',
            value, // this.state.value aka what's in the input box right now
            onChange: this.updateAutosuggestField
        };
        const renderSuggestion = (suggestion, { query, isHighlighted }) => {
            return(
            <div>
                {suggestion.place_name}
            </div>
            )
        }
        let photosArray;
        if(photos){
            if(photos.length > 0){
            photosArray = photos.map(photo => (photo));
            }
        }
        let {id, name, date, details, lat, lon} = this.props;

        // console.log(photos);

        const options = {onCloseStart : ()=>{this._saveChanges();}, onOpenEnd : ()=> {console.log(this.state.name, id)}};
        date = moment(date).format("MMM Do YYYY");
        let slides = null;
        if(photosArray){
            slides = photosArray.map((photo, i) => {
                return(
                    <Slide key={i} image={<img src={`photos/${photo}`}  alt='' />}>
                    </Slide>
                )
            })
        }
        return (

            <Modal id={`${id}`} open={true} options={options}>

                <div className="modal-content">
                <div id='savingTrip'>
                    <p>Saving changes...</p>
                </div>
                    <span className='card-title'>
                        <h2 className='trip-title' onBlur={(e)=>{this._updateName(e.target.textContent);}} contentEditable={true} suppressContentEditableWarning={true} >{name}</h2>
                    {/* <Autosuggest 
                            suggestions={suggestions} // this.state.suggestions to select from
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} // where Axios and the filtering happens
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested} // onBlur(-ish), clears the rendered suggestions
                            getSuggestionValue={this.getSuggestionValue} // selector for suggestion, drops into state of final value
                            renderSuggestion={renderSuggestion} // the div of suggestion below input field
                            inputProps={inputProps} // placeholder, final value, and the onChange function
                            highlightFirstSuggestion={true} // cues the user that they need to select one of these options
                            focusInputOnSuggestionClick={false} // when you take a suggestion, the input blurs
                            className='trip-title' 
                            onBlur={()=>{this._updateName();}} contentEditable={true} 
                            suppressContentEditableWarning={true}
                        /> */}
                    </span>
                    <div className='card-action grey-text'>
                        {/* <div onBlur={(e)=>{this._updateDate(e.target.textContent);}} contentEditable={true} suppressContentEditableWarning={true} >{date}</div> */}
                        <input type="text" id={`editTripDate${id}`} className="datepicker" defaultValue={date} ></input>
                    </div>
                    <p onBlur={(e)=>{this._updateDetails(e.target.textContent);}} contentEditable={true} suppressContentEditableWarning={true} >{details}</p>
                </div>

                    {/* <a title='Upload your trip photos!' id="addTripPhotos" className="pulse btn-floating waves-effect waves-light" onClick={this._choosePicture} onMouseOver={this._removePulse} >
                        <i className="pulse material-icons" >add</i>
                        <input id="tripPhotoInput" style={{visibility:"hidden"}} type="file" onChange={this._changeFileName} accept="image/png, image/jpeg, image/jpg, image/gif" />

                    </a> */}
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
                                    <section className="container">
                                        <div {...getRootProps()}>
                                            <div className="btn">
                                                <span>Images</span>
                                            </div>
                                            <input {...getInputProps()} />
                                            {files.length > 0 ? <ul>{files.map(file=><li>{file.key}</li>)}</ul> : null}
                                            {files.length === 0 && !isDragActive && `Upload photos for your trip!`}
                                            {files.length === 0 && isDragActive && !isDragReject && "Drop it like it's hot!"}
                                            {files.length === 0 && isDragReject && "File type not accepted, sorry!"}
                                            {files.length === 0 && isFileTooLarge && (
                                                <div className="text-danger mt-2">
                                                    File is too large.
                                                </div>
                                            )}
                                        </div>
                                    </section>
                                )}
                            </Dropzone>
                        <br />
                        <br />
                    {photosArray ? <Slider>{slides}</Slider> : null}



                <a className="btn-floating right" title={this.state.deleteThisTrip ? 'undo': 'delete'} onClick={this._toggleDeleteTrip}><i className="material-icons">{this.state.deleteThisTrip ? 'undo':'delete'}</i></a>
                <span className={this.state.deleteThisTrip ? "grey darken-3 undodelete-tooltip" : "grey darken-3 tooltip-hidden" }>Undo Delete</span>

            </Modal>
        )
    }
    _saveChanges = () => {
        this.setState({
            editPhotos : false,
        }, () => {
            // we need to POST to db as well as alert the Dashboard 
            // component that it's time to freshly render with the latest from DB

            const {name, location, details, lat, lon} = this.state
            let date1 = document.getElementById(`editTripDate${this.props.id}`).value.toString() 
            const date = moment(date1, 'MMM Do YYYY').format("YYYY-MM-DD")
            const propsDate = moment(this.props.date).format("YYYY-MM-DD")

            const body = {
                trip_location : location,
                trip_date : date,
                lat,
                lon,
                trip_details : details,
            }
            if(this.state.deleteThisTrip){
                axios.delete(`trips/delete/${this.props.id}`)
                .then(this.props.updateApp)
            }
            if((name!==this.props.name)||(date!==propsDate)||(details!==this.props.details)){
                console.log("prop id: ", this.props.id);
                axios.post(`/trips/edit/${this.props.id}`, body)
                .then(this.props.updateApp)
            }

            this.props.shutTheDoorBehindYou();
        })
        
    }
    _updateName = () => {
        // this.setState({name: this.state.location},
        //     this._showSaving)
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
    _editPhotos = (e) => {
        this.setState({
            editPhotos : true
        })
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

    // _changeFileName = (e) => {
    //     console.log(" ******** ********** ********** _changeFileName firing");
    //     // If we are to implement multiple files per upload, we will have to change the logic to a forEach or Map.
    //     console.log(e.target.files[0]);
    //     if(e.target.files[0]){
    //         this.setState({
    //             fileName:e.target.files[0]
    //         },() => {this._uploadFile(this.state.fileName)})
    //     }
    // }
    // _uploadFile = (file) => {
    //     let formData = new FormData();
    //     formData.append('file',file)
    //     const photoFormData = formData
    //     this.setState({
    //         photoFormData
    //     }, async () => {
    //         console.log(photoFormData);
            
    //         photoFormData.append('tripId', this.props.id)
    //         const {data} = await axios.post('/photos', photoFormData, {headers:{'content-type':'multipart/form-data'}})
    //         const latestPhotoURL = data.photo_url
    //         this.setState({photos:[...this.state.photos, latestPhotoURL]});
    _showSaving = () => {
        const {name, details, photos, lat, lon} = this.state
        let date = document.getElementById(`editTripDate${this.props.id}`).value.toString()
        date = moment(date).format("YYYY-MM-DD")
    
        if((name!==this.props.name) || (date!==this.props.date) || (details!==this.props.details) || (photos!==this.props.photos)){
            document.getElementById('savingTrip').style.display='inline'
            setTimeout(function () {document.getElementById('savingTrip').style.display='none'}, 2000)
        }
    }


    geocodeSearch = async () => {
        let {data} = await axios.post(`/cors`, {location: this.state.location})
        this.setState({
            response: data.data.features,
            suggestions : data.data.features,
        }, () => {
            this.state.response.forEach(res => {
                // console.log('response state',res.place_name)
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
        })
        return (place_name)
    };

    // This will allows the component to be a controlled component
    updateAutosuggestField = (event, { newValue }) => {
        this.setState({
            value: newValue,
            location: newValue,
        }, ()=>{this.geocodeSearch()});
        
    };
    
    // Autosuggest will call these function every time you need to update suggestions.
        getSuggestions = (value) => {
            const inputValue = value.trim().toLowerCase();
            const inputLength = inputValue.length;
            const suggestionArryOfObjects =  inputLength === 0 ? [] : (this.state.response.length > 0 ? (this.state.response.filter(lang =>{
                return lang.place_name.toLowerCase().slice(0, inputLength) === inputValue
            })) : []);
            return suggestionArryOfObjects.map(suggestion => suggestion.place_name)
        };
        // You already implemented this logic above, so just use it.
        onSuggestionsFetchRequested = ({ value }) => {
            this.setState({
                suggestions: this.getSuggestions(value)
            });
        };
    
    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };





    //     //   const {data} = await axios.post('/users/profilepic', this.state.photoFormData, {headers:{'content-type':'multipart/form-data'}} )
    //     //   const latestPhotoURL = data.newPic[0].photo_url
    //     //   this.setState({latestPhotoURL, tooltipShouldShow:true,})
    //     })
    // }


    _onDrop = async (files) => {
        console.log(files);
        let photoFormData = null;
        photoFormData = new FormData();
        files.forEach((file, i) => {
            photoFormData.append(`file${i}`,file);
        })
        console.log('tripId', this.props.id)
        photoFormData.append('tripId', this.props.id);
        console.log("photoFormData: ", photoFormData)
        const {data} = await axios.post('/photos', photoFormData, {headers:{'content-type':'multipart/form-data'}});
        const photos = data.trip_photos;
        // const photos = photosStringObject.map(photo => JSON.parse(photo))
        console.log("LOOK HERE");
        console.log(photos);
        console.log("*********************************************");
        this.setState({photos})
        // probably have to get a fresh trip object to get the latest photo references...
    }
}

