import React from 'react';
import axios from 'axios';

export default function ProfileButton({user, clearState}){
  function hoverOn(){
    const fab = document.getElementById("fab");
    fab.classList.remove("foward-action-removed");
    fab.classList.add("foward-action-shown");
    const pictureFrame = document.getElementsByClassName("picture-frame")[0]
    pictureFrame.style="background-color:  #4db6ac";
  }
  function hoverOff(){
    const fab = document.getElementById("fab");
    fab.classList.remove("foward-action-shown");
    fab.classList.add("foward-action-removed");
    const pictureFrame = document.getElementsByClassName("picture-frame")[0]
    pictureFrame.style="background-color: #26a69a";

  }
  async function logOut(e){
    e.preventDefault();
    await axios.get('/signout');
    clearState();
}
  const photo = user.photoURL;
  return(
    <div className="museum" onMouseLeave={hoverOff} >
      <div className="gallery-wall" onMouseEnter={hoverOn} onClick={hoverOn}>
        <div className="picture-frame">
          {photo? 
            <img alt="" src={`photos/${photo}`} ></img>
          :
            <p>{`${user.firstName[0]}${user.lastName[0]}`}</p>
          }
        </div>
      </div>
      <div id="fab" className="foward-action-removed"  >
        <ul >
          <a href="#profile" className={`modal-trigger`}>
            <li title="Edit Profile"  className="btn btn-floating fab-buttons">
              <i className="fas fa-user-cog"></i>
            </li>
          </a>
          <a>
            <li title="Sign Out" onClick={(e)=> logOut(e) } className="btn btn-floating fab-buttons">
              <i className="fas fa-door-open"></i>
            </li>
          </a>
        </ul>
      </div>
    </div>
    )
}