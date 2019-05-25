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
  return(
    <div className="museum" onMouseLeave={hoverOff} >
      <div className="gallery-wall" onMouseEnter={hoverOn} >
        <div className="picture-frame">
          {/* <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_1280.png"></img> */}
          <p style={{fontSize:"1.7em", fontWeight:"200"}} >{`${user.firstName[0]}${user.lastName[0]}`}</p>
        </div>
      </div>
      <div id="fab" className="foward-action-removed"  >
        <ul >
          <a href="#profile" className={`modal-trigger`}>
            <li className="btn btn-floating fab-buttons">
              <i className="fas fa-user-cog"></i>
            </li>
          </a>
          <a> {/* Reduntant/Useless `<a></a>` tag because they impart their own padding/margin. 
                Rather than unstyle the tag above to match the button below, the lazy programmer
                behind this choice decided to apply the styles here instead, cheaply, with a useless
                anchor tag. */}
            <li onClick={(e)=> logOut(e) } className="btn btn-floating fab-buttons">
              <i className="fas fa-door-open"></i>
            </li>
          </a>
        </ul>
      </div>
    </div>
    )
}

// .liquorcabinet 
// .picture-frame
// .picture-frame img 


