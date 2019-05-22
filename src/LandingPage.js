import React from 'react';
import axios from 'axios';
import SignIn from './components/auth/SignIn';
import App from './App';
axios.defaults.withCredentials = true;


class RealApp extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user : {},
    };
    this._getRandomBackground();
  }
  componentDidMount(){
    
  }
  render(){
    console.log(this.state.user);
    console.log(typeof this.state.user);
    return(
    this.state.user.id ?
      <App user={this.state.user} />
    :
      <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}>
        <div style={{
          marginTop:"-20vh",
          paddingLeft:"5vw",
        }}>
          <h2>
            Map Travel App
          </h2>
        </div>
        <div style={{
          width:"60%", 
          height:"50%", 
          position:"relative", 
          float:"right", 
          paddingTop:"20vh"
        }}>
          <SignIn handleSignIn={this._signIn} />
        </div>
      </div>
    )
  }
  _getRandomBackground = async () => {
    const randomNumber = Math.floor(Math.random() * Math.floor(3)) // gets random number, 1 - 3
    document.body.style.backgroundImage = `url("./assets/desktop_${randomNumber}.png")`;
  }
  _signIn = (user) => {
    this.setState({user})
  }
}
export default RealApp;