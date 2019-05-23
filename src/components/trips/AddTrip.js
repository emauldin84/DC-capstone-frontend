import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M, {options, elem} from 'materialize-css'
import axios from 'axios'


import {DatePicker, Autocomplete}from 'react-materialize'

export default class AddTrip extends Component {
    state = {
        location: 'Madison',
        date: null,
        tripdetails: '',
        response: null,
        fileName:null,
        tripId:null,
        message:null,
    }

    handleChange = (e) => {
        console.log('e.target.value:',[e.target.value])
        console.log('event:', [e])
        this.setState({
            [e.target.id]: e.target.value,
        }, () => {
            this.geocodeSearch();
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
        console.log('event:', [e][0])
        this.setState({
            date: [e][0]
        }) 
    }

    handleSubmit = (e) => {
        e.preventDefault()

        console.log('state:',this.state)
        console.log('event:',e)
        console.log('submit props:',this.props)
    }

    geocodeSearch = async () => {
        let {data} = await axios.post(`/cors`, {location: this.state.location})
        console.log('after axios', data)

        this.setState({
            response: data.data.features
        }, () => {
            this.state.response.forEach(res => {
                console.log('response state',res.place_name)
            })
        }
        )
    }

    render() {
        let data1 = []
        if (this.state.response){
            (this.state.response).forEach(location => {
                // console.log(typeof location.place_name)
                const name = location.place_name.split(',')[0]
                console.log(name)
                // name.toString();
                data1[name.toString()] = null})
        }

        return (
        <div className='container'>
            <form onSubmit={this.handleSubmit} id="myform" className='white' method='post' encType='multipart/form-data' action='/upload'>
                <h5 className='grey-text text-darken-3'>Add a New Trip</h5>

                {/* location selector field */}
                
                    <Autocomplete
                        onChange={this.handleLocation}
                        data={data1}
                        >
                        <div className='input-field'>
                            <label htmlFor='location'>Location</label>
                            <input type='text' id='location' className='autocomplete' required  />
                        </div>
                    </Autocomplete>
                

                {/* date picker */}
                <div className='input-field'>
                    <label htmlFor='date'>Date</label>
                    <DatePicker type='text' id='date' className='datepicker' required onChange={this.handleDateChange}/>
                    
                    {/* <input type='text' className='datepicker' id='date' onChange={this.handleDateChange} /> */}
                </div>

                {/* text input field */}
                <div className="input-field">
                    <label htmlFor="tripdetails">Trip Details / Itinerary</label>
                    <textarea id="tripdetails" className="materialize-textarea" onChange={this.handleChange}></textarea>
                </div>

                {/* file input */}
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input type="file" name="foo" onChange={this._changeFileName} accept="image/png, image/jpeg, image/jpg, image/gif" multiple/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Select multiple trip images for upload"/>
                        </div>
                    </div>

                {/* submit button */}
                <div className='input-field'>
                    <button className='btn teal lighten-1 z-depth-0'type="submit" onClick={this._getFormData}>Submit</button>
                </div>
            </form>
            
            {/* <div>
                <form id="myform"  encType="multipart/form-data">
                    <input name="foo" onChange={this._changeFileName} type="file" accept="image/png, image/jpeg, image/jpg, image/gif"></input>
                    <button type="submit" onClick={this._getFormData}>Submit</button>
                    <h4>{this.state.message}</h4>
                </form>
            </div> */}

        </div>
        )
    }
    _changeFileName = (e) => {
        console.log("The file name is ,", e.target.files);
        this.setState({
            fileName:e.target.files[0]
        })
    }
    _getFormData = (e) => {
        e.preventDefault();
        this._uploadFile(this.state.fileName)
            .then((response)=>{
                console.log("should be a json rspons", response.data);
            })
    
    }
    
    _uploadFile = (file) => {
            console.log("_upload file running");
            //this will pass the user id in
        const url = `/photos`;
        const formData = new FormData();
        formData.append('file',file)
        formData.append('tripId',2)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  axios.post(url, formData, config)
        
        
    }
}
