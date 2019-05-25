import React from 'react';
import { Modal, } from 'react-materialize';
import axios from 'axios';

export default class ProfileModal extends React.Component{
  constructor(props){
    super(props);
    const { firstName, lastName, email, photoURL, } = this.props.user;
    this.state = {
      firstName, 
      lastName, 
      email, 
      photoURL,
      newPassword : ''
    };
  }
  render(){
    const {user} = this.props;
    const options = {onCloseStart : ()=>{this._saveChanges();},};
    return(
      <Modal id={"profile"}  options={options}>
        <div className="profile-modal">
            <div className="profile-top-row">
                <div className="profile-picture-frame">
                    {/* <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_1280.png"></img> */}
                    <p>{`${this.state.firstName[0]}${this.state.lastName[0]}`}</p>
                </div>
                <h3>
                  <div id="firstName" onBlur={this._updateField} contentEditable={true} suppressContentEditableWarning={true}>{user.firstName}</div>
                  <div style={{opacity:"0"}}>_</div> {/*Flex was behaving "too well," so the most efficient way this programmer found was to add a "hidden" space between the two names. If you are reading this and would like to make a better suggestion, the programmer would welcome a Pull Request! */}
                  <div id="lastName" onBlur={this._updateField}  contentEditable={true} suppressContentEditableWarning={true}>{user.lastName}</div>
                </h3>
            </div>
            <div className="profile-second-row">
                <button onClick={this._showPasswordCheck}>
                    Change Password
                </button>
                  <input id="oldpassword"  type="password" className="old-password-input" onFocus={this._attachListener} onBlur={(e) => {this._detachListener(e); this._checkPassword();}}></input>
                  <input id="newpassword1" type="password" className="new-password-input" onFocus={this._attachListener} onBlur={(e) => {this._detachListener(e); this._showNewPassword2();}}></input>
                  <input id="newpassword2" type="password" className="new-password-input" onFocus={this._attachListener} onBlur={(e) => {this._detachListener(e);}}></input>
                <h5 id="email" onBlur={this._updateField}  contentEditable={true} suppressContentEditableWarning={true}>
                    {user.email}
                </h5>
            </div>
        </div>
      </Modal>
      )
  }
  _updateField = ({target}) => {
    this.setState({
      [target.id] : target.textContent
    })
  }
  _saveChanges = () => {
    // we need to POST to db as well as alert the Landing Page 
    const { firstName, lastName, email, photoURL, } = this.state
    const body = { 
      firstName, 
      lastName, 
      email,
      photoURL, 
    }
    if((firstName!==this.props.firstName)||(lastName!==this.props.lastName)||(email!==this.props.email)||(photoURL!==this.props.photoURL)){
        axios.post(`/users`, body)
        .then(this.props.updateLanding)
    }
  }
  _showPasswordCheck = () => {
    const oldPassword = document.getElementById("oldpassword");
    oldPassword.style="visibility: visible;"
    oldPassword.addEventListener('keypress', this._listenForEnter);
    oldPassword.focus() // put cursor in the input field
  }
  _checkPassword = async () => {
    const password = document.getElementById("oldpassword").value
    const {data} = await axios.post('/signin', {email: this.props.user.email, password})
    if(data.id){
      document.getElementById("oldpassword").removeEventListener('keypress', this._listenForEnter)
      this._showNewPassword1()
    }
    else if(data.status === 401){
      // Wrong password! We can alert the user to that here.
    }
  }

  _showNewPassword1 = () => {
    const newPassword = document.getElementById("newpassword1")
    newPassword.style="visibility: visible;"
    newPassword.focus()
  }
  _showNewPassword2 = () => {
    const newPassword = document.getElementById("newpassword1")
    const newPassword2 = document.getElementById("newpassword2")
    if(newPassword.value){
      newPassword2.style="visibility: visible;"
      newPassword2.focus()
    }else{
      newPassword2.style="visibility: hidden;"
      newPassword.focus()
    }
  }

  _attachListener = (e) => {
    (e.target).addEventListener('keypress', this._listenForEnter)
  }
  _detachListener = (e) => {
    (e.target).removeEventListener('keypress', this._listenForEnter)
  }
  _listenForEnter = (e) => { // allows users to either press "Enter" or click outside of the password field to submit their request
    if (e.keyCode === 13){
      console.log(e.srcElement.id);
      if(e.srcElement.id === "oldpassword"){
        this._checkPassword();
      }
      else if (e.srcElement.id === "newpassword1"){
        this._showNewPassword2()
      }
      else if (e.srcElement.id === "newpassword2"){
        const newPassword = e.srcElement.value
        const firstPassword = document.getElementById("newpassword1").value
        if (newPassword === firstPassword){
          this.setState({newPassword})
        }
        else{
          // let the user know that their passwords don't match
        }
      }
    }
  }

}