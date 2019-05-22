import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;


export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    render() {
        return (
        <div className='container'>
            <form onSubmit={this._handleSubmit} className='white'>
                <h5 className='grey-text text-darken-3'>Sign In</h5>
                <div className='input-field'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' onChange={this._handleChange} />
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' onChange={this._handleChange} />
                </div>
                <div className='input-field'>
                    <button className='btn teal lighten-1 z-depth-0'>Login</button>
                </div>
            </form>
            
        </div>
        )
    }
    _handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }
    _handleSubmit = async (e) => {
        e.preventDefault();
        const signInCheck = await axios.post('/signin', this.state)
            if (signInCheck.status !== 200){
                console.log("Failed");
            }
            else{
                this.props.handleSignIn(signInCheck.data)
            }
    }
}
