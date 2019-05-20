import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'

// import M, {options} from 'materialize-css'
import {DatePicker} from 'react-materialize'

export default class AddTrip extends Component {
    state = {
        location: '',
        date: null,
    }


    handleChange = (e) => {
        console.log('e.target.value:',[e.target.value])
        console.log('event:', [e])
        this.setState({
            location: e.target.value,
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

    // componentDidMount() {
    //     document.addEventListener('DOMContentLoaded', function() {
    //         var elems = document.querySelectorAll('.datepicker');
    //         var instances = M.Datepicker.init(elems, options);
    //     });
    // }

    render() {
        return (
        <div className='container'>
            <form onSubmit={this.handleSubmit} className='white'>
                <h5 className='grey-text text-darken-3'>Add a New Trip</h5>

                {/* location selector field */}
                <div className='input-field'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' id='location' required onChange={this.handleChange} />
                </div>

                {/* date picker */}
                <div className='input-field'>
                    <label htmlFor='date'>Date</label>
                    <DatePicker type='text' id='date' className='datepicker' required onChange={this.handleDateChange}/>
                    
                    {/* <input type='text' className='datepicker' id='date' onChange={this.handleDateChange} /> */}
                </div>

                {/* text input field */}
                <div class="input-field">
                    <label for="tripdetails">Trip Details / Itinerary</label>
                    <textarea id="tripdetails" className="materialize-textarea" onChange={this.handleChange}></textarea>
                </div>

                {/* file input */}
                <form method='post' enctype='multipart/form-data' action='/upload'>
                    <div class="file-field input-field">
                        <div class="btn">
                            <span>File</span>
                            <input type="file" name='file' multiple/>
                        </div>
                        <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Select multiple trip images for upload"/>
                        </div>
                    </div>
                </form>

                {/* submit button */}
                <div className='input-field'>
                    <button className='btn teal lighten-1 z-depth-0'>Submit</button>
                </div>
            </form>
            
        </div>
        )
    }
}
