import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <ul className='right'>
            <li><NavLink to='/'>Singin</NavLink></li>
            <li><NavLink to='/'>Singup</NavLink></li>
        </ul>
    )
}

export default SignedOutLinks
