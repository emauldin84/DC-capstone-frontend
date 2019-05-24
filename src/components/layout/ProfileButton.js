import React from 'react';

export default function ProfileButton({user}){
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
  return(
    <div>
      <div className="gallery-wall" onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
        <div className="picture-frame">
          <img src="https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_1280.png"></img>
        </div>
      </div>
      <div id="fab" className="foward-action-removed">
        <ul>
          <li className="">
            text
          </li>
        </ul>
      </div>
    </div>
    )
}

// .liquorcabinet 
// .picture-frame
// .picture-frame img 

