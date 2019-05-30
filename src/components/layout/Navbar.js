import React from 'react';
import ProfileButton from './ProfileButton';
import ProfileModal from './ProfileModal';

export default function Navbar({ user, clearState, updateLanding, }) {
    return (
        <nav className='nav-wrapper grey darken-3'>
            <img src='./assets/flaminGO_logo.png' height='50' className='left site-logo' alt='' title='Flamingo Logo'/>
            <div className=''>
                <ProfileButton user={user} clearState={clearState}/>
                <ProfileModal user={user} updateLanding={updateLanding} />
            </div>
        </nav>
    )
}