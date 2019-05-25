import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;


export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            signIn : {
                email: 'eric@test.com',
                password: 'test',
            },
            signUp : {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
            },
            showSignUp : false,
        };
    }
    componentDidMount() {
        // On mount, let's check to see if the backend already has session data on this user
        axios.get('/session')
        .then(({data}) => {this.props.signInUser(data.user)}); 
        // the backend either send the user object that LandingPage needs to unmount this component or it came back with an empty object.
    }
    render() {
        return (
        <div className='container'>
            <form onSubmit={this._handleSignIn} className='white'>
                <h5 className='grey-text text-darken-3'>Sign In</h5>
                <div className='input-field'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' onChange={this._handleSignInChange} />
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' onChange={this._handleSignInChange} />
                </div>
                <div className='input-field'>
                    <button type="submit" className='btn teal lighten-1 z-depth-0'>Sign In</button>
                </div>
            </form>
            {this.state.showSignUp ?
                <form onSubmit={this._handleSignUp} className='white'>
                    {/* <h5 className='grey-text text-darken-3'>Sign In</h5> */}
                    <div className='input-field'>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='name' id='firstName' onChange={this._handleSignUpChange} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input type='name' id='lastName' onChange={this._handleSignUpChange} />
                    </div>
                    <div className='input-field'>
                        <button className='btn teal lighten-1 z-depth-0'>Sign Up</button>
                    </div>
                </form>
            : 
                null
            }
        </div>
        )
    }
    _handleSignInChange = (e) => {
        this.setState({
            signIn : {
                ...this.state.signIn,
                [e.target.id]: e.target.value,
            },
            signUp : {
                ...this.state.signUp,
                [e.target.id]: e.target.value,
            }
        })
    }
    _handleSignUpChange = (e) => {
        this.setState({
            signUp : {
                ...this.state.signUp,
                [e.target.id]: e.target.value,
            },
        })
    }
    _handleSignIn = async (e) => {
        e.preventDefault();
        const signInCheck = await axios.post('/signin', this.state.signIn)
        const {data} = signInCheck;
        if (signInCheck.status !== 200){
            console.log("Something is wrong with the backend");
        }
        else{
            if(data.id){
                this.props.signInUser(data)
            }
            else{
                this.setState({
                    showSignUp : true
                })
            }
        }
    }
    _handleSignUp = async (e) => {
        e.preventDefault();
        // const 
        const signInCheck = await axios.post('/signin', this.state.signUp)
        const {data} = signInCheck;
        if (signInCheck.status !== 200){
            console.log("Something is wrong with the backend");
        }
        else{
            if(data.id){
                this.props.signInUser(data)
            }
            else{
                this.setState({
                    showSignUp : true
                })
            }
        }
    }
}
