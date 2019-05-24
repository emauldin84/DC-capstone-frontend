import React from 'react'
import { Button, Modal, } from 'react-materialize'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { longStackSupport } from 'q';
import axios from 'axios';

export default function Navbar({user,clearState}) {
    async function logOut(e){
        e.preventDefault();
        await axios.get('/signout');
        clearState();
    }
    console.log(user);
    const styles = user.photo? {content:"url(https://sc01.alicdn.com/kf/HTB1Fw69B3KTBuNkSne1q6yJoXXa3/Fresh-potato-market-Fresh-potato-factory-Holland.jpg_50x50.jpg)", top:"0px", borderRadius:"1000px"} : {top:"0px"};
    return (
        <nav className='nav-wrapper grey darken-3'>
            <div className='container'>
                {/* <div className='brand-logo left'>Interactive Travel Map</div> */}

                <div style={{position:"relative", fontFamily:"sans-serif"}}>
                <Button   
                    floating
                    fab={{direction: 'bottom'}}
                    icon={`EM`}
                    //   className="red"
                    large
                    style={styles}
                    className='btn btn-floating teal lighten-1'
                    >
                    {/* {`${user.firstName[0]}${user.lastName[0]}`} */}
                    {/* <i className="fas fa-user-cog"></i> */}
                    <div onClick={(e)=> logOut(e) } className="btn btn-floating teal'"><i className="fas fa-door-open"></i></div>
                    <a href={`#profile`} className={`modal-trigger`} >
                        <div className="btn btn-floating teal'"><i className="fas fa-user-cog"></i></div>
                    </a>
                </Button>

                {/* <div
                id="potato"
                className="right"
                style={{
                    position:'absolute',
                    height:"56px",
                    width:"56px",
                    right:"-43px",
                    top:"4.5px",

                }}
                ><img 
                    style={{width:"100%",borderRadius:"50%"}} 
                    src={user.photo||null}></img> </div> */}
                </div>

                {/* <SignedInLinks />
                <SignedOutLinks /> */}
            </div>

            <Modal id={"profile"} header={`${user.firstName} ${user.lastName}`} options={null}>
                <div>
                    {user.firstName}
                </div>
            </Modal>
        </nav>
    )
}