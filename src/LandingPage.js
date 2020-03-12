import React from 'react';
import axios from 'axios';
import SignIn from './components/auth/SignIn';
import App from './App';
import Modal from 'react-materialize/lib/Modal';
import Spinner from './components/layout/Spinner'
axios.defaults.withCredentials = true;


class LandingPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user : {},
      modalShouldShow : true,
      loading: true,
    };

    axios.get('/session')
    .then(({data}) => this._signIn(data.user))
    .then(() => {
      this.setState({
        loading: false,
      })
    })

  }

  render(){
    if(this.state.user.id){
      document.body.style.backgroundImage = null;
    }
    return(
    this.state.user.id ?
      <App user={this.state.user} handleSignOut={this._clearUser} updateLanding={this._updateUser} />
    :
    this.state.loading ? <Spinner /> : 
      <div className='container right column'>
        <div className='landing-page-div'>
          <SignIn signInUser={this._signIn} showModal={this._showModal} hideModal={this._hideModal}/>
        </div>
        <Modal id="loading" open={this.state.modalShouldShow} actions='&nbsp;' options={{dismissible:false,}}>
          <div className="preloader-wrapper big active center-align">
            <div className="spinner-layer spinner-teal-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
  _signIn = (user) => {
    this.setState({user})
  }
  _clearUser = () => {
    this.setState({user:{}})
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