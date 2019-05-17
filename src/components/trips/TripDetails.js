import React from 'react'
import Slider from './Slider'

export default function TripDetails() {
    
    return (
        <div className='container trip-details'>
            <div className='card z-depth-0'>
                <div className='card-content'>
                    <span className='card-title'>Cape Town, South Africa</span>
                    <p>Lorem ipsum aaand away we go</p>
                </div>
                <div className='card-action grey lighten-4 grey-text'>
                    <div>12/25/2019</div>
                </div>
                <Slider />
                
            </div>
        </div>
    )
    
}
