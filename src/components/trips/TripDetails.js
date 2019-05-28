import React from 'react';
// import SliderWrapper from './SliderWrapper';
import { Modal, Slider, Slide, Caption, } from 'react-materialize';
import axios from 'axios';
import M from 'materialize-css';
import moment from 'moment';
import Dropzone, {useDropzone} from "react-dropzone";


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
        const { files, photos, } = this.state;
        let {id, name, date, details, lat, lon, } = this.props;
        let photosArray = null;
        if(photos){
            if(photos.length > 0){
            photosArray = photos.map(photo => (photo));
            }
        }
        console.log(photos)
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
                    <span className='card-title'>
                        <h2 onBlur={(e)=>{this._updateName(e.target.textContent);}} contentEditable={true} suppressContentEditableWarning={true} >{name}</h2>
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
            const {name, details, lat, lon} = this.state
            let date1 = document.getElementById(`editTripDate${this.props.id}`).value.toString() 
            const date = moment(date1, 'MMM Do YYYY').format("YYYY-MM-DD")
            const propsDate = moment(this.props.date).format("YYYY-MM-DD")
            const body = {
                trip_location : name,
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