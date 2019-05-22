import React from 'react'
import Slider from './Slider'
import {Modal} from 'react-materialize'

export default function TripDetails({id, name, date, details, lat, lon}) {
    return (
        <Modal id={id} header={name}>
            <div class="modal-content">
                    <span className='card-title'>{name} - id:{id}</span>
                        <div className='card-action grey-text'>
                            <div>{date}</div>
                        </div>
                    <p>{details}</p>
                </div>
                <Slider />
        </Modal>
    )
    
}
