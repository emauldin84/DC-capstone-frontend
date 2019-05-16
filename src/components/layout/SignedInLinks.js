import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SignedInLinks() {
    return (
        <ul className='right'>
            <li><NavLink to='/'>Future Trips</NavLink></li>
            <li><NavLink to='/'>Past Trips</NavLink></li>
            <li><NavLink to='/'>Log Out</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating purple darken-3'>EM</NavLink></li>
        </ul>
    )
}
