import React from 'react'
import Slider from './Slider'
import {Modal, Button} from 'react-materialize'

export default function TripDetails(props) {

    const id = props.match.params.id;
    
    return (
        <div>
        <Modal header="Trip" trigger={<Button>Button</Button>}>
                <div class="modal-content">
                    <span className='card-title'>Cape Town, South Africa - id:{id}</span>
                    <p>Lorem ipsum aaand awaaaaaaay we go</p>
                </div>
                <Slider />
                <div class="modal-footer">
                    <a href="#!" class="modal-close waves-effect waves-green btn-flat">Agree</a>
                </div>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
            </p>
        </Modal>
        </div>
    )
    
}
