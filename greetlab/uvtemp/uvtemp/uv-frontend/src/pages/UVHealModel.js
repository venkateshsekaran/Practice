import React, { useState, useEffect } from 'react'
import "../css/ClientTable.css"
import { Button, Form, Row, Col, Spinner, Modal, Table } from "react-bootstrap"
import AdminLayout from "../components/AdminLayout"
import Axios from "axios"
import config from "../config/config"
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'


const UVHealModel = () => {
    const history = useHistory()
    const [isLoading, isLoadingUpdate] = useState(false)
    const [modelId, modelIdUpdate] = useState('')
    const [modelName, modelNameUpdate] = useState('')
    const [noOfLamps, noOfLampsUpdate] = useState(1)
    const [noOfDrivers, noOfDriversUpdate] = useState('')
    const [modelType, modelTypeUpdate] = useState('')
    const [report, reportUpdate] = useState('')

    // const [driver, driverUpdate] = useState('')
    const [driverId, driverIdUpdate] = useState([])
    const [driverList, driverListUpdate] = useState([{ id: 'id1', make: 'make1' }, { id: 'id2', make: 'make2' }])
    const [searchDriver, searchDriverUpdate] = useState('')
    const [showDriver, showDriverUpdate] = useState(false)
    const handleCloseDriver = () => showDriverUpdate(false)
    const handleShowDriver = () => showDriverUpdate(true)

    // const [driver, driverUpdate] = useState('')
    const [lamps, lampsUpdate] = useState([])
    const [lampList, lampListUpdate] = useState([{ id: 'lamp1' }, { id: 'lamp2' }])
    const [searchLamp, searchLampUpdate] = useState('')
    const [showLamp, showLampUpdate] = useState(false)
    const handleCloseLamps = () => showLampUpdate(false)
    const handleShowLamps = () => showLampUpdate(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        isLoadingUpdate(true)
        const url = `${config.BASE_API_URL}common/saveUvhealModel`
        // const data = { modelId, modelName, lampList:lamps, driverId, noOfLamps, noOfDrivers, modelType }
        let formData = new FormData();
        formData.append("file", report)
        formData.append("uvHeal", JSON.stringify({ modelId, modelName, lampList:lamps, driverId, noOfLamps, noOfDrivers, modelType }))
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, configs)
        Axios.post(url, formData, configs)
            .then((res) => {
                isLoadingUpdate(false)
                console.log(res.data)
                if (res.data?.message) {
                    toast(res.data?.message)
                    history.push('/uvhealmodel-list')
                }
            })
            .catch((err) => {
                isLoadingUpdate(false)
                console.log(err, "err")
                if (err.response?.data?.message) {
                    toast(err.response.data.message)
                }
            })
    }

    useEffect(() => {
        const url = `${config.BASE_API_URL}admin/getDriverList`
        const data = { searchString: searchDriver }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                if (res.data.code == 200 && res.data.responseData) {
                    driverListUpdate(res.data.responseData)
                }
                console.log(res.data, "driverlistupdate")
            })
            .catch((error) => {
                console.log(error, "err")
            })
    }, [searchDriver])

    useEffect(() => {
        const url = `${config.BASE_API_URL}common/getLampList`
        const data = { searchString: searchLamp }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                if (res.data.code == 200 && res.data.responseData) {
                    lampListUpdate(res.data.responseData)
                }
                console.log(res.data, "lamplistupdate")
            })
            .catch((error) => {
                console.log(error, "err")
            })
    }, [searchLamp])

    return (
        <AdminLayout>
            <div className="clientTableCont">
                <p className="clientTableHead">UV Heal Model Details</p>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Model Id"
                                value={modelId}
                                onChange={(e) => { modelIdUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Model Name"
                                value={modelName}
                                onChange={(e) => { modelNameUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Model Type"
                                value={modelType}
                                onChange={(e) => { modelTypeUpdate(e.target.value) }}
                                as="select" custom>
                                <option value=""> Model Type </option>
                                <option value="coil"> Coil</option>
                                <option value="duct"> Duct</option>
                            </Form.Control>
                        </Col>


                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="No of Drivers"
                                value={noOfDrivers}
                                onChange={(e) => { noOfDriversUpdate(e.target.value) }}
                            />
                        </Col>

                        <Col sm={4}>
                            <Button onClick={handleShowDriver} className="inputBtn borderBlue" >
                                Driver Id : { driverId[0] } </Button>
                            <Modal size="lg" show={showDriver} onHide={handleCloseDriver}>
                                <Modal.Header closeButton>
                                    <Modal.Title> Driver List :  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Col>
                                            <Form.Control className="ml-2 clientTableFormControl" type="text"
                                                placeholder="Search"
                                                name="search"
                                                value={searchDriver}
                                                onChange={(e) => { searchDriverUpdate(e.target.value) }} />

                                            {
                                                driverList.length > 0 &&
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>
                                                            <th> Make </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            driverList.length > 0 && driverList.map((item, index) => {
                                                                return (
                                                                    <tr onClick={() => {
                                                                        const addId = item.id
                                                                        if (driverId.indexOf(addId) == -1 && driverId.length < 1) {
                                                                            driverIdUpdate([...driverId, addId])
                                                                        }
                                                                    }}
                                                                        key={index}>
                                                                        <td> {item.id} </td>
                                                                        <td> {item.make} </td>

                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                            }
                                        </Col>
                                        <Col >
                                            {
                                                driverId.length > 0 &&
                                                driverId.map((i, index) => {
                                                    return <span
                                                        onClick={() => {
                                                            driverIdUpdate(driverId.filter(item => item != i))
                                                        }}
                                                        className="selectedId"
                                                        key={index}>
                                                        <FaTimes />
                                                        {i}   </span>
                                                })
                                            }
                                        </Col>
                                    </Row>
                                </Modal.Body>
                            </Modal>
                        </Col>



                        <Col sm={4} >
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="No of Lamps"
                                value={noOfLamps}
                                onChange={(e) => { noOfLampsUpdate(e.target.value) }}
                            />
                        </Col>

                        <Col sm={4}>
                            <Button onClick={handleShowLamps} className="inputBtn borderBlue" >
                                Lamp  : {lamps[0]} </Button>
                            <Modal size="lg" show={showLamp} onHide={() => { showLampUpdate(false) }}>
                                <Modal.Header closeButton>
                                    <Modal.Title> Lamp List :  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Col>
                                            <Form.Control className="ml-2 clientTableFormControl" type="text"
                                                placeholder="Search"
                                                name="search"
                                                value={searchLamp}
                                                onChange={(e) => { searchLampUpdate(e.target.value) }} />

                                            {
                                                lampList.length > 0 &&
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>Id</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            lampList.length > 0 && lampList.map((item, index) => {
                                                                return (
                                                                    <tr onClick={() => {
                                                                        const addId = item.id
                                                                        if (lamps.indexOf(addId) == -1 && lamps.length < 1) {
                                                                            lampsUpdate([...lamps, addId])
                                                                        }
                                                                    }}
                                                                        key={index}>
                                                                        <td> {item.id} </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                            }
                                        </Col>
                                        <Col >
                                            {
                                                lamps.length > 0 &&
                                                lamps.map((i, index) => {
                                                    return <span
                                                        onClick={() => {
                                                            lampsUpdate(lamps.filter(item => item != i))
                                                        }}
                                                        className="selectedId"
                                                        key={index}>
                                                        <FaTimes />
                                                        {i}   </span>
                                                })
                                            }
                                        </Col>
                                    </Row>
                                </Modal.Body>
                            </Modal>
                        </Col>



                    </Row>

                    {/* <p className="mb-3">   Real JS Reports : </p> */}

                    {/* <input type="file" onChange={(e) => { reportUpdate(e.target.files[0]) }} /> */}

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

export default UVHealModel;