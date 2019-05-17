import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'

// import M, {options} from 'materialize-css'
import {DatePicker, options} from 'react-materialize'

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
                <div className='input-field'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' id='location' onChange={this.handleChange} />
                </div>
                <div className='input-field'>
                    <label htmlFor='date'>Date</label>
                    {/* <input type='text' className='datepicker' id='date' onChange={this.handleDateChange} /> */}
                    <DatePicker id='date' name='date' onChange={this.handleDateChange}/>
                </div>
                <div className='input-field'>
                    <button className='btn purple lighten-1 z-depth-0'>Submit</button>
                </div>
            </form>
            
        </div>
        )
    }
}
