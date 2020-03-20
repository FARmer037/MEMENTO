import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
    return (
        <ul className='right'>
            <li><NavLink to='/'>New Plan</NavLink></li>
            <li><NavLink to='/'>Covis-19 Stats</NavLink></li>
            <li><NavLink to='/'>Logout</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>FM</NavLink></li>
        </ul>
    )
}

export default SignedInLinks
