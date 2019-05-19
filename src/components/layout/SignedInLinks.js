import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SignedInLinks() {
    return (
        <ul className='right'>
            <li><NavLink to='/trips'>Trips</NavLink></li>
            {/* <li><NavLink to='/'>Past Trips</NavLink></li> */}
            <li><NavLink to='/'>Log Out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating teal lighten-1'>EM</NavLink></li>
        </ul>
    )
}
