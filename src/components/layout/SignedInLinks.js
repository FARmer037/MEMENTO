import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
    return (
        <ul className='right'>
            <li><NavLink to='/create'>New Story</NavLink></li>
            <li><NavLink to='/covid'>Covid-19 Stats</NavLink></li>
            <li><NavLink to='/'>Logout</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating'>FM</NavLink></li>
        </ul>
    )
}

export default SignedInLinks
