import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M, {options, elem} from 'materialize-css';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';


import {DatePicker, Autocomplete}from 'react-materialize';

export default class AddTrip extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: '',
            date: null,
            tripdetails: '',
            response: [],
            fileName:null,
            tripId:null,
            message:null,
            value: '',
            suggestions: [],
        };
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
            response: data.data.features,
            suggestions : data.data.features,
        }, () => {
            this.state.response.forEach(res => {
                console.log('response state',res.place_name)
            })
        }
        )
    }

    getSuggestionValue = (suggestion) => suggestion;

    
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
            },
            ()=>{
                console.log("Here are your suggestions: ")
                console.log(this.state.suggestions)
            });
        };
    
    // Autosuggest will call this function every time you need to clear suggestions.
    // Housekeeping
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        // let data1 = []
        // if (this.state.response){
        //     (this.state.response).forEach(location => {
        //         // console.log(typeof location.place_name)
        //         const name = location.place_name.split(',')[0]
        //         console.log(name)
        //         // name.toString();
        //         data1[name.toString()] = null})
        // }

        const { value, suggestions } = this.state; // a little destructuring for conveinence 
        const inputProps = {
            placeholder: 'Type a programming language', // "Choose a destination"
            value, // this.state.value aka what's in the input box right now
            onChange: this.updateAutosuggestField
        };
        const renderSuggestion = suggestion => {
            console.log("from renderSuggestion:");
            console.log(suggestion)
            return(
            <div>
                {suggestion.place_name}
            </div>
            )
        }

        return (
        <div className='container'>
            <form onSubmit={this.handleSubmit} id="myform" className='white' method='post' encType='multipart/form-data' action='/upload'>
                <h5 className='grey-text text-darken-3'>Add a New Trip</h5>
                
                <Autosuggest 
                    suggestions={suggestions} // this.state.suggestions to select from
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested} // where Axios and the filtering happens
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested} // onBlur(-ish), clears the rendered suggestions
                    getSuggestionValue={this.getSuggestionValue} // selector for suggestion, drops into state of final value
                    renderSuggestion={renderSuggestion} // the div of suggestion below input field
                    inputProps={inputProps} // placeholder, final value, and the onChange function
                />


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
