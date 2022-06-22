import React from 'react'
import { Footer, Card, Button } from "react-bootstrap"
import "../css/SideBar.css"
import { useHistory } from "react-router-dom"

const SideBar = () => {
    const history = useHistory()
    return (
        <div className="sideBarCont">
            <div style={{ backgroundColor : 'darkblue', marginBottom: '10px' , fontSize : '20px' }} 
            onClick={() => { history.push('/dashboard') }} className="sideContLink"> Dashboard </div>
            {/* <div onClick={() => { history.push('/real-time-reports') }} className="sideContLink"> Real Time Reports </div> */}
            {/* <div onClick={() => { history.push('/lamp-of-life') }} className="sideContLink"> Lamp of Life </div> */}
            {/* <div onClick={() => { history.push('/di-status') }} className="sideContLink"> DI Status </div> */}

        </div>
    )
}
export default SideBar;