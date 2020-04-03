import React from 'react'
import { Menu } from 'antd';

const SignedInLinks = () => {
    return (
        <Menu mode="horizontal">
            <Menu.Item >
                <a href="/create">New Story</a>
            </Menu.Item>
            <Menu.Item >
                <a href="/covid">Covid-19 Stats</a>
            </Menu.Item>
            <Menu.Item >
                <a href="/">Logout</a>
            </Menu.Item>
        </Menu>
    )
}

export default SignedInLinks
