import React, { useState } from 'react'
import "../css/ClientTable.css"
import { Button, Form, Row, Col, Spinner } from "react-bootstrap"
import AdminLayout from "../components/AdminLayout"
import Axios from "axios"
import config from "../config/config"
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const ControllerTable = (props) => {
    const {
        id,
        isDisabled,
        setShowControllerIdDuct,
        setShowControllerId
    } = props
    const history = useHistory()
    const [isLoading, isLoadingUpdate] = useState(false)
    // const [controllerId, controllerIdUpdate] = useState(id)
    const [connectedLamps, connectedLampsUpdate] = useState([])
    const [uvSensor, uvSensorUpdate] = useState('')
    const [airSpeedSensor, airSpeedSensorUpdate] = useState('')
    const [lamps, lampsUpdate] = useState([{ id: Math.random(), hrs: '', switch: '' }])
    const [di, diUpdate] = useState([{ id: Math.random(), diNo: '', type: '', description: '' }])

    const handleSubmit = (e) => {
        if (!connectedLamps || !uvSensor || !airSpeedSensor) {
            toast('Missing Fields.')
        } else {
            // e.preventDefault()
            isLoadingUpdate(true)
            const url = `${config.BASE_API_URL}common/saveController`
            const data = {
                controller: {
                    controllerId: id, connectedLamps, uvSensor,
                    airSpeedSensor, di, lamps
                }
            }
            const configs = { headers: { authorization: localStorage.getItem('token') } }
            console.log('form submit', url, data, configs)
            Axios.post(url, data, configs)
                .then((res) => {
                    isLoadingUpdate(false)
                    console.log(res.data)
                    if (res.data?.message) {
                        toast(res.data?.message)
                        setShowControllerIdDuct(false)
                        setShowControllerId(false)
                        // history.push('/controller-list')
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

    }

    const handleDi = (e, diItem) => {
        const arr = di.map((i, index) => {
            if (i.id == diItem.id) {
                console.log(i)
                return { ...i, [e.target.name]: e.target.value }
            } else {
                console.log(i)
                return i
            }
        })
        diUpdate(arr)
    }
    const handleLamp = (e, lampItem) => {
        const arr = lamps.map((i, index) => {
            if (i.id == lampItem.id) {
                console.log(i)
                return { ...i, [e.target.name]: e.target.value }
            } else {
                console.log(i)
                return i
            }
        })
        lampsUpdate(arr)
    }

    return (

        <div className="clientTableCont">
            <p className="clientTableHead">Controller Details</p>
            <Form onSubmit={(e) => {
                e.preventDefault()
            }}>
                <Row>
                    <Col sm={4}>
                        <Form.Control required
                            // disabled={isDisabled}
                            className="clientTableFormControl" type="text"
                            placeholder="Controller Id"
                            value={id}
                            onChange={(e) => { props.handlePropChange(e) }}
                        />
                    </Col>
                    <Col sm={4}>
                        <Form.Control required className="clientTableFormControl" type="text"
                            placeholder="Connected Lamps"
                            value={connectedLamps}
                            onChange={(e) => { connectedLampsUpdate(e.target.value) }}
                        />
                    </Col>
                    <Col sm={4}>
                        <Form.Control required className="clientTableFormControl"
                            as="select" custom
                            name="uvSensor"
                            value={uvSensor}
                            onChange={(e) => { uvSensorUpdate(e.target.value) }}
                        >
                            <option value={''}> UV Sensor </option>
                            <option value={'yes'}> Yes </option>
                            <option value={'no'}> No </option>
                        </Form.Control>
                    </Col>

                    <Col sm={4}>
                        <Form.Control required className="clientTableFormControl"
                            as="select" custom
                            value={airSpeedSensor}
                            onChange={(e) => { airSpeedSensorUpdate(e.target.value) }}
                        >
                            <option value={''}> Air Speed Sensor </option>
                            <option value={'yes'}> Yes </option>
                            <option value={'no'}> No </option>
                        </Form.Control>
                    </Col>
                </Row>
                {
                    di.length > 0 && di.map((diItem, index) => {
                        return (
                            <div key={index} className="shadow p-3">
                                <span className="float-left ml-2"> DI </span>
                                {
                                    index > 0 &&
                                    <Button
                                        className="float-right"
                                        size="sm" onClick={() => {
                                            diUpdate(di.filter((i) => {
                                                return i != diItem
                                            }))
                                        }}
                                        variant="primary" > Delete </Button>
                                }


                                <div className="clear-both mb-3"></div>

                                <Row>
                                    <Col sm={4}>
                                        <Form.Control required className="clientTableFormControl" type="text"
                                            name="diNo"
                                            placeholder="DI no"
                                            value={diItem.diNo}
                                            onChange={(e) => handleDi(e, diItem)}
                                        />
                                    </Col>

                                    <Col sm={4}>
                                        <Form.Control required
                                            className="clientTableFormControl"
                                            as="select" custom
                                            name="type"
                                            value={diItem.type}
                                            onChange={(e) => { handleDi(e, diItem) }}
                                        >
                                            <option value={''}> Type </option>
                                            <option value={'accessControl'}> Access Control </option>
                                            <option value={'limitSwitch'}> Limit Switch </option>
                                            <option value={'none'}> None  </option>
                                        </Form.Control>

                                    </Col>
                                    {
                                        diItem.type == 'none' &&
                                        <Col sm={4}>
                                            <Form.Control required className="clientTableFormControl" type="text"
                                                name="description"
                                                placeholder="Description"
                                                value={diItem.description}
                                                onChange={(e) => handleDi(e, diItem)}
                                            />
                                        </Col>
                                    }

                                </Row>
                            </div>)
                    })
                }
                {
                    di.length < 4 &&
                    <Button className="d-block mb-3 ml-auto mr-auto" variant="primary" onClick={() => {
                        diUpdate([...di, { id: Math.random(), diNo: '', type: '', description: '' }])
                    }}> Add DI + </Button>
                }


                {/* {
                        lamps.length > 0 && lamps.map((lampItem, index) => {
                            return (
                                <div className="shadow">
                                    <p className="text-center"> Lamp </p>
                                    <Row>
                                        <Col sm={4}>
                                            <Form.Control required className="clientTableFormControl" type="text"
                                                name="hrs"
                                                placeholder="DI no"
                                                value={lampItem.hrs}
                                                onChange={(e) => handleLamp(e, lampItem)}
                                            />
                                        </Col>
                                        <Col sm={4}>
                                            <Form.Control required className="clientTableFormControl" type="text"
                                                name="switch"
                                                placeholder="Type"
                                                value={lampItem.switch}
                                                onChange={(e) => handleLamp(e, lampItem)}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    } */}

                {/* <Button className="d-block ml-auto mr-auto mb-2" variant="primary" onClick={() => {
                        lampsUpdate([...lamps, { id: Math.random(), hrs: '', switch: '' }])
                    }}> Add Lamp + </Button> */}

                <Button onClick={handleSubmit} className="clientSubmit" variant="primary" >
                    {isLoading ?
                        <Spinner size="sm" role="status" animation="border" />
                        : 'Submit'}
                </Button>
            </Form >
        </div >

    )
}

export default ControllerTable;