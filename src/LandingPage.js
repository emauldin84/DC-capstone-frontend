import React from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;


class RealApp extends React.Component{
  constructor(props){
    super(props)
    this.state = {

    }
    this._getRandomBackground();
  }
  componentDidMount(){
    
  }
  render(){
    return(
    <div>

    </div>
    )
  }
  _getRandomBackground = async () => {
    const randomNumber = Math.floor(Math.random() * Math.floor(3)) // gets random number, 1 - 3
    document.body.style.backgroundImage = `url("./assets/desktop_${randomNumber}.png")`;
  }
}
export default RealApp;