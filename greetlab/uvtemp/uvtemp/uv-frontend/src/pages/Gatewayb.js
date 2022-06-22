import React, { useState, useEffect } from 'react'
import "../css/ClientTable.css"
import { Button, Form, Row, Col, Spinner } from "react-bootstrap"
import AdminLayout from "../components/AdminLayout"
import Axios from "axios"
import config from "../config/config"
import { toast } from "react-toastify"
import { useHistory } from 'react-router-dom'

const Gateway = () => {
    const history = useHistory()
    const [isLoading, isLoadingUpdate] = useState(false)

    const [clientId, clientIdUpdate] = useState('')
    const [gatewayId, gatewayIdUpdate] = useState('')
    const [gatewayDescription, gatewayDescriptionUpdate] = useState('')
    const [MACAddress, MACAddressUpdate] = useState('')
    const [controllerIds, controllerIdsUpdate] = useState('')
    const [data, dataUpdate] = useState([])

    useEffect(() => {
        const url = `${config.BASE_API_URL}admin/getAllClientList`
        const data = {}
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        Axios.post(url, data, configs)
            .then((res) => {
                if (res.data.code == 200) {
                    dataUpdate(res.data.responseJson, "getAllClientList")
                }
            })
            .catch((error) => {
                console.log(error, "err")
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        isLoadingUpdate(true)
        const url = `${config.BASE_API_URL}common/saveGateway`
        const data = { gateway: { clientId, gatewayId, controllerIds, MACAddress, gatewayDescription } }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                isLoadingUpdate(false)
                console.log(res.data)
                if (res.data?.message) {
                    toast(res.data?.message)
                }
                if (res.data.code == 200) {
                    history.push('/gateway-list')
                }
            })
            .catch((err) => {
                isLoadingUpdate(false)
                console.log(err, "err")
                if (err.response.data.message) {
                    toast(err.response.data.message)
                }
            })
    }

    return (
        <AdminLayout>
            <div className="clientTableCont">
                <p className="clientTableHead">Gateway Details</p>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        {/* <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Client Id"
                                value={clientId}
                                onChange={(e) => { clientIdUpdate(e.target.value) }}
                            />
                        </Col> */}
                        <Col sm={4}>
                            <Form.Control
                                className="clientTableFormControl"
                                placeholder="Client Id"
                                name="clientId"
                                value={clientId}
                                onChange={(e) => { clientIdUpdate(e.target.value) }}
                                as="select" >
                                <option value={''}>Client Id</option>
                                {
                                    data.length > 0 && data.map((client, index) => {
                                        return <option key={index} value={client.clientId}> {client.clientId} </option>
                                    })
                                }
                            </Form.Control>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Gateway Id"
                                value={gatewayId}
                                onChange={(e) => { gatewayIdUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text"
                                placeholder="Gateway Id"
                                value={controllerIds}
                                onChange={(e) => { controllerIdsUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Gateway Description"
                                value={gatewayDescription}
                                onChange={(e) => { gatewayDescriptionUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="MAC Address"
                                value={MACAddress}
                                onChange={(e) => { MACAddressUpdate(e.target.value) }}
                            />
                        </Col>
                    </Row>
                    <div className="clientSubmits">
                        <Button className="mr-3" variant="primary" type="submit">
                            {isLoading ?
                                <Spinner size="sm" role="status" animation="border" />
                                : 'Submit'}
                        </Button>
                        <Button onClick={() => {
                            clientIdUpdate('')
                            controllerIdsUpdate('')
                            gatewayDescriptionUpdate('')
                            MACAddressUpdate('')
                        }}
                            className="mr-3" variant="primary">
                            Cancel </Button>
                    </div>

                </Form >
            </div >
        </AdminLayout >
    )
}

export default Gateway;