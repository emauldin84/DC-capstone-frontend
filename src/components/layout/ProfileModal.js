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
                <h5 id="email" onBlur={this._updateField}  contentEditable={true} suppressContentEditableWarning={true}>
                    {user.email}
                </h5>
                <button>
                    Change Password
                </button>
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




}