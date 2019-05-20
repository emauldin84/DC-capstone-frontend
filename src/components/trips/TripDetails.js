import React from 'react'
import Slider from './Slider'

export default function TripDetails(props) {

    const id = props.match.params.id
    
    return (
        <div className='container trip-details'>
            <div className='card z-depth-0'>
                <div className='card-content'>
                    <span className='card-title'>Cape Town, South Africa - id:{id}</span>
                        <div className='card-action grey-text'>
                            <div>12/25/2019</div>
                        </div>
                    <p>Lorem ipsum aaand awaaaaaaay we go</p>
                </div>
                <Slider />
                
            </div>
        </div>
    )
    
}
