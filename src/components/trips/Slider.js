import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import M, {options} from 'materialize-css'

export default class Sliders extends Component {

    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.slider');
            var instances = M.Slider.init(elems, options);
        });

    }
    render() {
        return (
        <div>
            <div className="slider">
                    <ul className="slides">
                        <li>
                            <img src="https://dak95nwic4sny.cloudfront.net/73/south-africa-43313807-1533658538-ImageGalleryLightboxLarge.jpg"/>
                        </li>
                        <li>
                            <img src="https://www.shipit.co.uk/blog/wp-content/uploads/cape-town-south-africa.jpg"/>
                        </li>
                        <li>
                            <img src="https://www.azamaraclubcruises.com/sites/default/files/heros/cape-town-south-africa-1800x1000_1.jpg"/>
                        </li>
                        <li>
                            <img src="https://www.usnews.com/dims4/USNEWS/68c2a5f/2147483647/crop/2560x1198%2B0%2B0/resize/1000x468/quality/85/?url=http%3A%2F%2Fcom-usnews-beam-media.s3.amazonaws.com%2F33%2F13%2F50e9178949f7be648612279ce00a%2Fbc16-south-africa-crop-editorial.jpg"/>
                        </li>
                    </ul>
                </div>
            
        </div>
        )
    }
}
