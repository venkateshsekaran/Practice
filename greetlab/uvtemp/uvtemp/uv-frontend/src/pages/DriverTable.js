import React, { useState } from 'react'
import "../css/ClientTable.css"
import { Button, Form, Row, Col, Spinner } from "react-bootstrap"
import AdminLayout from "../components/AdminLayout"
import Axios from "axios"
import config from "../config/config"
import { toast } from "react-toastify"
import { useHistory } from 'react-router-dom'

const DriverTable = () => {
    const history = useHistory()
    const [isLoading, isLoadingUpdate] = useState(false)
    const [ID, IDUpdate] = useState('')
    const [make, makeUpdate] = useState('')
    const [size, sizeUpdate] = useState('')
    const [wattage, wattageUpdate] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        isLoadingUpdate(true)
        const url = `${config.BASE_API_URL}common/saveDriver`
        const data = { driver: { id: ID, make, size, wattage } }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                isLoadingUpdate(false)
                if (res.data?.message) {
                    toast(res.data?.message)
                    history.push('/driver-list')
                }
            })
            .catch((err) => {
                isLoadingUpdate(false)
                console.log(err, "err")
                if (err?.response?.data?.message) {
                    toast(err.response.data.message)
                }
            })
    }

    return (
        <AdminLayout>
            <div className="clientTableCont">
                <p className="clientTableHead">Driver Details</p>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Driver ID"
                                value={ID}
                                onChange={(e) => { IDUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Driver Make"
                                value={make}
                                onChange={(e) => { makeUpdate(e.target.value) }}
                            />
                        </Col>

                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Driver Length"
                                value={size}
                                onChange={(e) => { sizeUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Driver Wattage"
                                value={wattage}
                                onChange={(e) => { wattageUpdate(e.target.value) }}
                            />
                        </Col>
                    </Row>
                    <Button className="clientSubmit" variant="primary" type="submit">
                        {isLoading ?
                            <Spinner size="sm" role="status" animation="border" />
                            : 'Submit'}
                    </Button>
                </Form >
            </div >
        </AdminLayout >
    )
}

export default DriverTable;