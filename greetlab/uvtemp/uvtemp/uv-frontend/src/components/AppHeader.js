import React from 'react'
import { Navbar, Nav, Button } from "react-bootstrap"
import logo from "../img/Logo without Background(1).png"
import { useHistory } from "react-router-dom"

const AppHeader = () => {
    const history = useHistory()
    return (
        <>
            <Navbar bg="light" variant="light">
            <Navbar.Brand href="/dashboard">
                    <img src={logo} alt="UV Heal" 
                    width="150px" height="52px" />
                </Navbar.Brand>
                <Nav className="ml-auto">

                <Navbar.Brand href="/dashboard">
                    UV Heal Client</Navbar.Brand>
                    <Button onClick={() => {
                        history.push('/')
                        localStorage.removeItem('token')
                    }} variant="primary"> Logout</Button>
                </Nav>
               
            </Navbar>
        </>
    )
}

export default AppHeader;