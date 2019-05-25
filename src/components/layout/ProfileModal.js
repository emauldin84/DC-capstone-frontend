import React from 'react';
import { Modal, } from 'react-materialize';

export default class ProfileModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }
  render(){
    const {user} = this.props;
    return(
      <Modal id={"profile"}  options={null}>
        <div className="profile-modal">
            <div className="profile-top-row">
                <div className="profile-picture-frame">
                    {/* <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_1280.png"></img> */}
                    <p style={{fontSize:"1.7em", fontWeight:"200"}} >{`${user.firstName[0]}${user.lastName[0]}`}</p>
                </div>
                <h3>
                {user.firstName} {user.lastName}
                </h3>
            </div>
            <div className="profile-second-row">
                <h5>
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
}