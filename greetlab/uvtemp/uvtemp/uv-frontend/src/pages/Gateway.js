import React, { useState, useEffect } from 'react'
import "../css/ClientTable.css"
import { Button, Form, Row, Col, Spinner, Modal, Table } from "react-bootstrap"
import AdminLayout from "../components/AdminLayout"
import Axios from "axios"
import config from "../config/config"
import { toast } from "react-toastify"
import { useHistory } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'

const Gateway = ({ clientId, gatewaySetShow }) => {
    const history = useHistory()
    const [isLoading, isLoadingUpdate] = useState(false)
    const [data, dataUpdate] = useState([])
    const [gateway, gatewayUpdate] = useState([
        {
            sqsCommandUrl: '', sqsStatusUrl: '', clientId: clientId,
            // gatewayId: Math.floor(Math.random() * 100), 
            gatewayId: '',
            gatewayDescription: '',
            macAddress: '', serialNo: '', controllerIds: [], showControllerId: false
        }
    ])
    const [searchControllerId, searchControllerIdUpdate] = useState('')
    const [controllerList, controllerListUpdate] = useState([])

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

    useEffect(() => {
        getControllerIdBasedOnClients()
    }, [searchControllerId])

    const getControllerIdBasedOnClients = () => {
        const url = `${config.BASE_API_URL}common/getControllerIdBasedOnClient`
        const data = { clientId, searchControllerId }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log(url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                if (res.data.code == 200) {
                    controllerListUpdate(res.data.responseJson)
                }
            })
            .catch((error) => {
                console.log(error, "err")
            })
    }

    const validate = () => {
        let value = false
        gateway.forEach((item, index) => {
            console.log(item.controllerIds.length, "lll")
            if (item.controllerIds.length == 0) {
                toast('Please select controller Ids.')
                value = false
            } else {
                value = true
            }
        })
        return value
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const valid = validate()
        console.log(valid)
        if (valid) {
            isLoadingUpdate(true)
            const url = `${config.BASE_API_URL}common/saveGateway`
            const data = { gateway: gateway }
            const configs = { headers: { authorization: localStorage.getItem('token') } }
            console.log('form submit', url, data, configs)
            Axios.post(url, data, configs)
                .then((res) => {
                    isLoadingUpdate(false)
                    console.log(res, "gatewayb res")
                    if (res.data?.message) {
                        toast(res.data?.message)
                    }
                    if (res.data.code == 200) {
                        gatewaySetShow(false)
                    }
                })
                .catch((err) => {
                    isLoadingUpdate(false)
                    toast('Something went wrong.')
                })
        }

    }

    const handleChange = (e, gatewayItem, index) => {
        // let gateWayData = gateway
        // gateWayData[index].clientId = { [e.target.name]: e.target.value }
        // gatewayUpdate(gateWayData)
        gatewayUpdate(gateway.map((i, index) => {
            if (i == gatewayItem) {
                return { ...i, [e.target.name]: e.target.value }
            } else {
                return i
            }
        }))
    }

    return (
        <div className="clientTableCont">
            <p className="clientTableHead">Gateway Details</p>
            <Form onSubmit={handleSubmit}>

                {
                    gateway.length > 0 &&
                    gateway.map((gatewayItem, index) => {
                        return <div key={index} style={{
                            backgroundColor: '#eee',
                            padding: '10px',
                            margin: '10px 0px'
                        }} >
                            {
                                gateway.length > 1 &&
                                <Button className="d-block ml-auto" size="sm" variant="primary"
                                    onClick={() => {
                                        gatewayUpdate(gateway.filter((i, index) => {
                                            return i != gatewayItem
                                        }))
                                    }} > <FaTimes /> </Button>
                            }
                            <Row >
                                {/* <Col sm={4}>
                                        <Form.Control
                                            className="clientTableFormControl"
                                            placeholder="Client Id"
                                            name="clientId"
                                            value={gatewayItem.clientId}
                                            onChange={(e) => { handleChange(e, gatewayItem,index) ; getControllerIdBasedOnClients(e.target.value)}}
                                            as="select" >
                                            <option value={''}>Client Id</option>
                                            {
                                                data.length > 0 && data.map((client, index) => {
                                                    return <option key={index} value={client.clientId}> {client.clientId} </option>
                                                })
                                            }
                                        </Form.Control>
                                    </Col> */}
                                <Col sm={4}>
                                    <Form.Control
                                        readOnly
                                        className="clientTableFormControl"
                                        placeholder="Client Id"
                                        name="clientId"
                                        value={gatewayItem.clientId}
                                        onChange={(e) => { handleChange(e, gatewayItem, index) }}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Form.Control
                                        required
                                        className="clientTableFormControl"
                                        placeholder="SQS Status Url"
                                        type="text"
                                        name="sqsStatusUrl"
                                        value={gatewayItem.sqsStatusUrl}
                                        onChange={(e) => { handleChange(e, gatewayItem) }}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Form.Control
                                        required
                                        className="clientTableFormControl"
                                        placeholder="SQS Command Url"
                                        type="text"
                                        name="sqsCommandUrl"
                                        value={gatewayItem.sqsCommandUrl}
                                        onChange={(e) => { handleChange(e, gatewayItem) }}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Form.Control required className="clientTableFormControl"
                                        type="text" placeholder="Gateway Id"
                                        name="gatewayId"
                                        value={gatewayItem.gatewayId}
                                        onChange={(e) => { handleChange(e, gatewayItem) }}
                                    />
                                </Col>

                                {/* <Col sm={4}>
                                        <Form.Control required className="clientTableFormControl"
                                            type="text" placeholder="Controller Id"
                                            name="controllerId"
                                            value={gatewayItem.controllerId}
                                            onChange={(e) => { handleChange(e, gatewayItem) }}
                                        />
                                    </Col> */}

                                <Col sm={4}>
                                    <Button onClick={() => {
                                        gatewayUpdate(gateway.map((i, index) => {
                                            if (i == gatewayItem) {
                                                return { ...i, showControllerId: true }
                                            } else {
                                                return i
                                            }
                                        }))
                                    }} className="inputBtn borderBlue" >
                                        Controller Id </Button>
                                    <Modal size="lg" show={gatewayItem?.showControllerId} onHide={() => {
                                        gatewayUpdate(gateway.map((i, index) => {
                                            if (i == gatewayItem) {
                                                return { ...i, showControllerId: false }
                                            } else {
                                                return i
                                            }
                                        }))
                                    }}>
                                        <Modal.Header closeButton>
                                            <Modal.Title> Controller Id :  </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Row>
                                                <Col>
                                                    <Form.Control className="ml-2 clientTableFormControl" type="text"
                                                        placeholder="Search"
                                                        name="search"
                                                        value={searchControllerId}
                                                        onChange={(e) => { searchControllerIdUpdate(e.target.value) }} />

                                                    {
                                                        controllerList.length > 0 &&
                                                        <Table striped bordered hover>
                                                            <thead>
                                                                <tr>
                                                                    <th>Id</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    controllerList.length > 0 && controllerList.map((item, index) => {
                                                                        return (
                                                                            <tr onClick={() => {
                                                                                gatewayUpdate(gateway.map((i, index) => {
                                                                                    const arr = i.controllerIds
                                                                                    const id = item.id
                                                                                    if (i == gatewayItem && arr.indexOf(id) == -1 && arr.length < 33) {
                                                                                        return { ...i, controllerIds: [...arr, id] }
                                                                                    } else {
                                                                                        return i
                                                                                    }
                                                                                }))
                                                                            }}
                                                                                key={index}>
                                                                                <td> {item?.id} </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    }
                                                </Col>
                                                <Col>
                                                    {
                                                        gatewayItem?.controllerIds.length > 0 &&
                                                        gatewayItem?.controllerIds.map((ids, index) => {
                                                            return <span
                                                                onClick={() => {
                                                                    gatewayUpdate(gateway.map((i, index) => {
                                                                        const arr = i.controllerIds
                                                                        const id = ids
                                                                        if (i == gatewayItem) {
                                                                            return { ...i, controllerIds: arr.filter(filterItem => filterItem != id) }
                                                                        } else {
                                                                            return i
                                                                        }
                                                                    }))
                                                                }}
                                                                className="selectedId"
                                                                key={index}>
                                                                <FaTimes />
                                                                {ids}   </span>
                                                        })
                                                    }
                                                </Col>
                                            </Row>
                                        </Modal.Body>
                                    </Modal>
                                </Col>

                                <Col sm={4}>
                                    <Form.Control required className="clientTableFormControl"
                                        type="text" placeholder="Gateway Description"
                                        name="gatewayDescription"
                                        value={gatewayItem.gatewayDescription}
                                        onChange={(e) => { handleChange(e, gatewayItem) }}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Form.Control required className="clientTableFormControl"
                                        type="text" placeholder="MAC Address"
                                        name="macAddress"
                                        value={gatewayItem.macAddress}
                                        onChange={(e) => { handleChange(e, gatewayItem) }}
                                    />
                                </Col>
                                <Col sm={4}>
                                    <Form.Control required className="clientTableFormControl"
                                        type="text" placeholder="Serial No"
                                        name="serialNo"
                                        value={gatewayItem.serialNo}
                                        onChange={(e) => { handleChange(e, gatewayItem) }}
                                    />
                                </Col>
                            </Row>
                        </div>
                    })
                }


                <div className="clientSubmits">
                    <Button style={{ minWidth: '105px' }} onClick={() => {
                        gatewayUpdate([...gateway, {
                            sqsStatusUrl: '',
                            sqsCommandUrl: '',
                            clientId: clientId,
                            gatewayId: Math.floor(Math.random() * 100),
                            gatewayDescription: '',
                            macAddress: '',
                            serialNo: '',
                            showControllerId: false,
                            controllerIds: []
                        }])
                    }}
                        className="mr-3" variant="primary">
                        Add More + </Button>
                    <Button style={{ minWidth: '105px' }} className="mr-3" variant="primary" type="submit">
                        {isLoading ?
                            <Spinner size="sm" role="status" animation="border" />
                            : 'Submit'}
                    </Button>
                    <Button style={{ minWidth: '105px' }} onClick={() => {
                        gatewayUpdate([{
                            sqsUrl: '', clientId: clientId, gatewayId: '', gatewayDescription: '',
                            macAddress: '', controllerIds: []
                        }])
                    }}
                        className="mr-3" variant="primary">
                        Cancel </Button>

                </div>

            </Form >
        </div >
    )
}

export default Gateway;