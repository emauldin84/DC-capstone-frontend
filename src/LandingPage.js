import React from 'react';
import axios from 'axios';
import SignIn from './components/auth/SignIn';
import App from './App';
import Modal from 'react-materialize/lib/Modal';
axios.defaults.withCredentials = true;


class LandingPage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user : {},
      modalShouldShow : true,
    };
    // // On mount, let's check to see if the backend already has session data on this user
    axios.get('/session')
    .then(({data}) => {this._signIn(data.user)}) 
    // the backend either send the user object that LandingPage needs to unmount this component or it came back with an empty object.
  }
  componentDidMount(){    
  }
  render(){
    if(this.state.user.id){
      document.body.style.backgroundImage = null;
    }

    return(
    this.state.user.id ?
      <App user={this.state.user} handleSignOut={this._clearUser} updateLanding={this._updateUser} />
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
          <SignIn signInUser={this._signIn} showModal={this._showModal} hideModal={this._hideModal}/>
        </div>
        <Modal id="loading" open={this.state.modalShouldShow} actions='&nbsp;' showFooter='false' options={{dismissible:false,}}>
          {/* <h4 className='loading'>Loading...</h4> */}
          {/* <div class="loader"></div> */}
          <div class="preloader-wrapper big active center-align">
            <div class="spinner-layer spinner-teal-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
  _getRandomBackground = async () => {
    const randomNumber = Math.floor(Math.random() * Math.floor(3)) // gets random number, 0 - 3
    document.body.style.backgroundImage = `url("./assets/desktop_${randomNumber}.png")`;
  }
  _signIn = (user) => {
    this.setState({user})
  }
  _clearUser = () => {
    this.setState({user:{}})
    // this._getRandomBackground();
  }
  _updateUser = async () => {
    const {data} = await axios.get('/users')
    const {user} = data
    this.setState({user});
  }
  _showModal = () => {
    this.setState({modalShouldShow:true,})
  }
  _hideModal = () => {
    this.setState({modalShouldShow:false,})
  }

}
export default LandingPage;