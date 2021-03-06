import React from 'react'
import { Menu } from 'antd';

const SignedOutLinks = () => {
    return (
        <Menu mode="horizontal">
            <Menu.Item key="mail">
                <a href="/">Signin</a>
            </Menu.Item>
            <Menu.Item key="app">
                <a href="/signup">Signup</a>
            </Menu.Item>
        </Menu>
    )
}

export default SignedOutLinks
