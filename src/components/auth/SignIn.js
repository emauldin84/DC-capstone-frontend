import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            signIn : {
                email: '',
                password: '',
            },
            signUp : {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
            },
            showSignUp : false,
        };
        this.props.showModal();
    }
    componentDidMount() {
        this._getRandomBackground();
        setTimeout(this.props.hideModal, 750);
    }
    render() {
        return (
        <div id="signin" className='container section'>
            
            <form onSubmit={this.state.showSignUp ? this._handleSignUp : this._handleSignIn} className='white signin-signup'>
                <div className="logo-tagline">
                    <img src='./assets/flaminGO_logo.png' width='100%' className='site-logo-landing center' alt='' title='Flamingo Logo'/>
                    <p className="tagline">Your leg up on trip management</p>
                </div>
                <h5 className='grey-text text-darken-3 section'>{this.state.showSignUp ? 'Sign Up' : 'Sign In' }</h5>
                <div className='input-field'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' onChange={this._handleSignInChange} />
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' onChange={this._handleSignInChange} />
                    {this.state.showSignUp ? null :<span className="helper-text right" onClick={this._toggleMenu}>Don't have an account? Sign up here.</span>}
                </div>
                {this.state.showSignUp ? null :
                <div className='input-field'>
                    <button type="submit" className='btn teal lighten-1 z-depth-0'>Sign In</button>
                </div>
                }
                {this.state.showSignUp ?
                <div>
                    <div className='input-field'>
                        <label htmlFor='firstName'>First Name</label>
                        <input type='text' id='firstName' onChange={this._handleSignUpChange} />
                    </div>
                    <div className='input-field'>
                        <label htmlFor='lastName'>Last Name</label>
                        <input type='text' id='lastName' onChange={this._handleSignUpChange} />
                        {this.state.showSignUp ? <span className="helper-text right" onClick={this._toggleMenu}>Already have an account? Sign in here.</span> : null}
                    </div>
                    <div className='input-field'>
                        <button className='btn teal lighten-1 z-depth-0'>Sign Up</button>
                    </div>
                </div>
            : 
                null
            }
            </form>
        </div>
        )
    }
    _getRandomBackground = async () => {
        const randomNumber = Math.floor(Math.random() * (19 - 3)) + 3
        document.body.style.backgroundImage = `url("./assets/desktop_${randomNumber}.jpg")`;
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
            // console.log("Something is wrong with the backend");
        }
        else{
            if(data.id){
                this.props.signInUser(data)
            }
            else{
                document.getElementById("signin").classList.add("shake")
                setTimeout(()=>{document.getElementById("signin").classList.remove("shake")}, 830)          
                this.setState({
                    showSignUp : true
                })
            }
        }
    }
    _handleSignUp = async (e) => {
        e.preventDefault();
        const {email, password, } = this.state.signUp
        if (email.includes("@") && email.includes(".") && password.length > 1){            
            const signInCheck = await axios.post('/signin', this.state.signUp)
            const {data} = signInCheck;
            if (signInCheck.status !== 200){
            }
            else{
                if(data.id){
                    this.props.signInUser(data)
                }
                else{
                    document.getElementById("signin").classList.add("shake")
                    setTimeout(()=>{document.getElementById("signin").classList.remove("shake")}, 830)              
                    this.setState({
                        showSignUp : true
                    })
                }
            }
        }
        else{
            document.getElementById("signin").classList.add("shake")
            setTimeout(()=>{document.getElementById("signin").classList.remove("shake")}, 830)          
        }
    }
    _toggleMenu = () => {
        this.setState ({
            showSignUp: !this.state.showSignUp
        })
    }
}
