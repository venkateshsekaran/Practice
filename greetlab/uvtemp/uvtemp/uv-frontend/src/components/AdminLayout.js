import React from 'react'
import { Row, Col } from "react-bootstrap"
import AdminHeader from './AdminHeader'
import ContentArea from './ContentArea'
import AdminSideBar from './AdminSideBar'

const AdminLayout = ({ children }) => {
    return (
        <>
            <AdminHeader />
            <Row style={{ marginRight: '0' }}>
                <Col sm={2} style={{ paddingRight : '0px'}}>
                    <AdminSideBar />
                </Col>
                <Col>
                    <ContentArea>{children}</ContentArea>
                </Col>
            </Row>
        </>
    )
}
export default AdminLayout;