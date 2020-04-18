import React, { useState, useEffect } from 'react'
import { Drawer, Button } from 'antd';
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import './Navbar.css'
import fire from '../../firebase/fire'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const [user, setUser] = useState({})

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user)
                setUser(user)
            else
                setUser(null)
        })
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    const navbarRander = () => {
        if (user) {
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
        else {
            return (
                <nav className="menuBar">
                    <div className="logo">
                        <a href="/">MEMENTO</a>
                    </div>
                    <div className="menuCon">
                        <div className="rightMenu">
                            <SignedOutLinks />
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
                            <SignedOutLinks />
                        </Drawer>
                    </div>
                </nav>
            )
        }
    }

    useEffect(() => {
        authListener()
    }, [])

    return (
        navbarRander()
    )
}

export default Navbar
