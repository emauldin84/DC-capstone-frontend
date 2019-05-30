import React from 'react'
import { Button, Modal, } from 'react-materialize'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import ProfileButton from './ProfileButton';
import ProfileModal from './ProfileModal';

export default function Navbar({ user, clearState, updateLanding, }) {
    // console.log(user);
    const styles = user.photo? {content:"url(https://sc01.alicdn.com/kf/HTB1Fw69B3KTBuNkSne1q6yJoXXa3/Fresh-potato-market-Fresh-potato-factory-Holland.jpg_50x50.jpg)", top:"0px", borderRadius:"1000px"} : {top:"0px"};
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