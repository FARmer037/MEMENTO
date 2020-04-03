import React, { useState } from 'react'
import { Drawer, Button } from 'antd';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import './Navbar.css'

const Navbar = () => {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    return (
        <nav className="menuBar">
            <div className="logo">
                <a href="/">MEMENTO</a>
            </div>
            <div className="menuCon">
                <div className="rightMenu">
                    <SignedInLinks />
                    {/* <SignedOutLinks /> */}
                </div>
                <Button className="barsMenu" type="primary" onClick={showDrawer}>
                    <span className="barsBtn"></span>
                </Button>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <SignedInLinks />
                    {/* <SignedOutLinks /> */}
                </Drawer>

            </div>
        </nav>
    )
}

export default Navbar
