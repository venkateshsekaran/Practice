import React from 'react'
import { Row, Col } from "react-bootstrap"
import AppHeader from './AppHeader'
import ContentArea from './ContentArea'
import SideBar from './SideBar'

const AppLayout = ({ children }) => {
    return (
        <>
            <AppHeader />
            <Row>
                <Col sm={2}>
                    <SideBar />
                </Col>
                <Col>
                    <ContentArea>{children}</ContentArea>
                </Col>
            </Row>
        </>
    )
}
export default AppLayout;