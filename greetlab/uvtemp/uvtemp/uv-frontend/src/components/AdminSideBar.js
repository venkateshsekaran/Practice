import React from 'react'
import { Footer, Card, Button } from "react-bootstrap"
import "../css/SideBar.css"
import { useHistory, useLocation } from "react-router-dom"

const AdminSideBar = () => {
    const history = useHistory()
    const location = useLocation()

    return (
        <div className="sideBarCont">
            
            <div style={{ backgroundColor: 'darkblue', marginLeft: '-10px', marginBottom: '10px', fontSize: '20px' }}
                onClick={() => { history.push('/admin-dashboard') }} className={`${location?.pathname == '/admin-dashboard' ? 'activeClass' : 'sideContLink'}`}> Admin Dashboard </div>

            <div onClick={() => { history.push('/client-list') }} className={`${location?.pathname == '/client-list' ? 'activeClass' : 'sideContLink'}`}> Client Details </div>
            <div onClick={() => { history.push('/driver-list') }} className={`${location?.pathname == '/driver-list' ? 'activeClass' : 'sideContLink'}`}> Driver Details </div>
            <div onClick={() => { history.push('/lamp-list') }} className={`${location?.pathname == '/lamp-list' ? 'activeClass' : 'sideContLink'}`}> Lamp Details </div>
            {/* <div onClick={() => { history.push('/gateway-list') }} className="sideContLink"> Gateway Details </div> */}
            <div onClick={() => { history.push('/controller-list') }} className={`${location?.pathname == '/controller-list' ? 'activeClass' : 'sideContLink'}`}> Controller Details </div>
            <div onClick={() => { history.push('/uvhealmodel-list') }} className={`${location?.pathname == '/uvhealmodel-list' ? 'activeClass' : 'sideContLink'}`}> UV Heal Model Details </div>
        </div>
    )
}

export default AdminSideBar;