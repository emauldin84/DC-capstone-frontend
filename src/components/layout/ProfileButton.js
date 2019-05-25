import React from 'react';
import axios from 'axios';

export default function ProfileButton({user, clearState}){
  function hoverOn(){
    const fab = document.getElementById("fab");
    fab.classList.remove("foward-action-removed");
    fab.classList.add("foward-action-shown");
  }
  function hoverOff(){
    const fab = document.getElementById("fab");
    fab.classList.remove("foward-action-shown");
    fab.classList.add("foward-action-removed");
  }
  async function logOut(e){
    e.preventDefault();
    await axios.get('/signout');
    clearState();
}
  return(
    <div className="museum" onMouseLeave={hoverOff} >
      <div className="gallery-wall" onMouseEnter={hoverOn} >
        <div className="picture-frame">
          <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_1280.png"></img>
        </div>
      </div>
      <div id="fab" className="foward-action-removed"  >
        <ul >
          <a href="#profile" className={`modal-trigger`}>
            <li className="btn btn-floating fab-buttons">
              <i className="fas fa-user-cog"></i>
            </li>
          </a>

            <li onClick={(e)=> logOut(e) } className="btn btn-floating fab-buttons">
            <i className="fas fa-door-open"></i>
            </li>

        </ul>
      </div>
    </div>
    )
}

// .liquorcabinet 
// .picture-frame
// .picture-frame img 


