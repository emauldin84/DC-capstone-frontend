import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M, {options, elem} from 'materialize-css'
import axios from 'axios'

// import M, {options} from 'materialize-css'
import {DatePicker} from 'react-materialize'

export default class AddTrip extends Component {
    state = {
        location: '',
        date: null,
        tripdetails: '',
        response: ''
    }

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.autocomplete');
            var instances = M.Autocomplete.init(elems, options);
            var instance = M.Autocomplete.getInstance('#location');
            
        
        });
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

    handleDateChange = (e) => {
        console.log('event:', [e][0])
        this.setState({
            date: [e][0]
        }
        ) 
    }

    handleSubmit = (e) => {
        e.preventDefault()

        console.log('state:',this.state)
        console.log('event:',e)
        console.log('submit props:',this.props)
        
        
    }

    geocodeSearch = async () => {
        let response = await axios.post(`/cors`, {location: this.state.location})

        this.setState({
            response: response.data.features
        })
        this.state.response.forEach(res => {
            console.log('response state',res.place_name)
        })
        
    }

    // componentDidMount() {
    //     document.addEventListener('DOMContentLoaded', function() {
    //         var elems = document.querySelectorAll('.datepicker');
    //         var instances = M.Datepicker.init(elems, options);
    //     });
    // }

    render() {
        return (
        <div className='container'>
            <form onSubmit={this.handleSubmit} className='white' method='post' encType='multipart/form-data' action='/upload'>
                <h5 className='grey-text text-darken-3'>Add a New Trip</h5>

                {/* location selector field */}
                <div className='input-field'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' id='location' className='autocomplete' required onChange={this.handleChange} />
                </div>

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
                            <input type="file" name='file' multiple/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" placeholder="Select multiple trip images for upload"/>
                        </div>
                    </div>

                {/* submit button */}
                <div className='input-field'>
                    <button className='btn teal lighten-1 z-depth-0'>Submit</button>
                </div>
            </form>
            
        </div>
        )
    }
}
