import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, Col, Form, Table } from "react-bootstrap"
import { FaTimes } from "react-icons/fa"
import Axios from "axios"
import config from "../config/config"

const EditControllerModal = (props) => {

    const [driverList, driverListUpdate] = useState([{ id: 'driver1' }, { id: 'driver2' }])
    const [searchDriver, searchDriverUpdate] = useState('')
    const [showDriver, showDriverUpdate] = useState(false)
    const handleCloseDriver = () => showDriverUpdate(false)
    const handleShowDriver = () => showDriverUpdate(true)

    const [lampList, lampListUpdate] = useState([{ id: 'lid1', lamp: 'lamp1' }, { id: 'lid2', lamp: 'lamp2' }])
    const [searchLamp, searchLampUpdate] = useState('')
    const [showLamp, showLampUpdate] = useState(false)
    const handleCloseLamps = () => showLampUpdate(false)
    const handleShowLamps = () => showLampUpdate(true)

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
        <Modal size="lg" show={props?.editShow} onHide={() => { props?.editSetShow(false) }}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={() => props?.handleEdit()}>
                    <Row>
                        <Col sm={2}>
                            <h6 className="mt-2"> Model ID </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Model ID"
                                name="modelId"
                                value={props?.editObj?.modelId}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>
                        <Col sm={2}>
                            <h6 className="mt-2"> Model Name </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Model Name"
                                name="modelName"
                                value={props?.editObj?.modelName}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>
                        <Col sm={2}>
                            <h6 className="mt-2"> Model type </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Model type"
                                as="select" custom
                                name="modelType"
                                value={props?.editObj?.modelType}
                                onChange={(e) => { props?.handleChange(e) }}
                            >
                                <option value="coil"> Coil</option>
                                <option value="duct"> Duct</option>
                            </Form.Control>
                        </Col>
                        {/* <Col sm={6}>
                        </Col> */}
                        <Col sm={2}>
                            <h6 className="mt-2"> No Of Drivers </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="No Of Drivers"
                                name="noOfDrivers"
                                value={props?.editObj?.noOfDrivers}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>
                       
                        <Col sm={2}>
                            <h6 className="mt-2"> Driver Id </h6>
                        </Col>
                        <Col sm={2}>
                            <Button onClick={handleShowDriver} className="inputBtn borderBlue" >
                                Edit  </Button>
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
                                                                        if (props?.editObj?.driverId.indexOf(addId) == -1
                                                                            && props?.editObj?.driverId.length < props?.editObj?.noOfDrivers) {
                                                                            const e = { target: { name: 'driverId', value: [...props?.editObj?.driverId, addId] } }
                                                                            props?.handleChange(e)
                                                                        }
                                                                    }}
                                                                        key={index}>
                                                                        <td> {item?.id} </td>
                                                                        <td> {item?.make} </td>

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
                                                props?.editObj?.driverId?.length > 0 &&
                                                props?.editObj?.driverId?.map((i, index) => {
                                                    return <span
                                                        onClick={() => {
                                                            const e = {
                                                                target: {
                                                                    name: 'driverId',
                                                                    value: props?.editObj?.driverId.filter(item => item != i)
                                                                }
                                                            }
                                                            props?.handleChange(e)
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


                        <Col sm={8}>
                            {
                                props?.editObj?.driverId?.length > 0 &&
                                props?.editObj?.driverId?.map((driverItm, index) => {
                                    return <span className="selectedIds">  {driverItm} </span>
                                })
                            }

                        </Col>
                        <Col sm={2}>
                            <h6 className="mt-2"> No of Lamps </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="No of Lamps"
                                name="noOfLamps"
                                value={props?.editObj?.noOfLamps}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>

                        <Col sm={6}> </Col>

                        <Col sm={2}>
                            <h6 className="mt-2"> Lamp List </h6>
                        </Col>

                        <Col sm={2}>
                            <Button onClick={handleShowLamps} className="inputBtn borderBlue" >
                                EDIT </Button>
                            <Modal size="lg" show={showLamp}
                                onHide={() => { showLampUpdate(false) }}>
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
                                                                        if (props?.editObj?.lampList?.indexOf(addId) == -1 && props?.editObj?.lampList?.length < props?.editObj?.noOfLamps) {
                                                                            const e = { target: { name: 'lampList', value: [...props?.editObj?.lampList, { id: addId }] } }
                                                                            props?.handleChange(e)
                                                                        }
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
                                        <Col >
                                            {
                                                props?.editObj?.lampList?.length > 0 &&
                                                props?.editObj?.lampList?.map((i, index) => {
                                                    return <span
                                                        onClick={() => {
                                                            const e = {
                                                                target: {
                                                                    name: 'lampList',
                                                                    value: props?.editObj?.lampList?.filter(item => item != i)
                                                                }
                                                            }
                                                            props?.handleChange(e)
                                                        }}
                                                        className="selectedId"
                                                        key={index}>
                                                        <FaTimes />
                                                        {i?.id}   </span>
                                                })
                                            }
                                        </Col>
                                    </Row>
                                </Modal.Body>
                            </Modal>
                        </Col>

                        <Col sm={8}>
                            {
                                props?.editObj?.lampList?.length > 0 &&
                                props?.editObj?.lampList?.map((lampListItm, index) => {
                                    return <span className="selectedIds">  {lampListItm?.id} </span>
                                })
                            }

                        </Col>

                    </Row>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={() => { props?.editSetShow(false) }}>
                    Cancel
          </Button>
                <Button variant="primary" onClick={() => { props?.handleEdit() }}>
                    {props.isEditLoading ? 'Editing..' : 'Submit'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditControllerModal;