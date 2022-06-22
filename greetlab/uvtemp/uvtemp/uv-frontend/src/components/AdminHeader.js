import React from 'react'
import { Navbar, Nav, Button } from "react-bootstrap"
import logo from "../img/Logo without Background(1).png"
import { useHistory } from "react-router-dom"

const AdminHeader = () => {
    const history = useHistory()
    return (
        <>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="/admin-dashboard">
                    <img src={logo} alt="UV Heal" 
                    width="150px" height="52px" />
                </Navbar.Brand>
                <Nav className="ml-auto">
                    <Navbar.Brand href="/admin-dashboard"> UV Heal Admin</Navbar.Brand>
                    <Button onClick={() => {
                        history.push('/')
                        // localStorage.removeItem('token')
                        localStorage.clear();
                    }} variant="primary"> Logout</Button>
                    {/* <Nav.Link href="#features">Features</Nav.Link> */}
                    {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
               
            </Navbar>
        </>
    )
}

export default AdminHeader;