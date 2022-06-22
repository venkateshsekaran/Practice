import React, { useEffect, useState } from 'react'
import "../css/ClientTable.css"
import { Button, Form, Row, Col, Modal, Table, Spinner } from "react-bootstrap"
import AdminLayout from "../components/AdminLayout"
import Axios from "axios"
import config from "../config/config"
import { toast } from "react-toastify"
import { useHistory } from 'react-router-dom'
import { FaBeer } from 'react-icons/fa'

const LampTable = () => {
    const history = useHistory()
    const [isLoading, isLoadingUpdate] = useState(false)
    const [ID, IDUpdate] = useState('')
    const [make, makeUpdate] = useState('')
    const [wattage, wattageUpdate] = useState('')
    const [length, lengthUpdate] = useState('')
    const [pin, pinUpdate] = useState('')
    const [description, descriptionUpdate] = useState('')

    const [driver, driverUpdate] = useState('')
    const [driverList, driverListUpdate] = useState([])
    const [searchDriver, searchDriverUpdate] = useState('')
    const [showDriver, showDriverUpdate] = useState(false)
    const handleCloseDriver = () => showDriverUpdate(false)
    const handleShowDriver = () => showDriverUpdate(true)

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

    const handleSubmit = (e) => {
        e.preventDefault()
        isLoadingUpdate(true)
        const url = `${config.BASE_API_URL}common/saveLamp`
        const data = { lamp: { id: ID, make, wattage, length, pin: { pinNo: pin, description }, driverId: driver, description } }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                isLoadingUpdate(false)
                if (res.data?.message) {
                    toast(res.data?.message)
                    history.push('/lamp-list')
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
                <p className="clientTableHead">Lamp Details</p>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Lamp ID"
                                value={ID}
                                onChange={(e) => { IDUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Lamp Make"
                                value={make}
                                onChange={(e) => { makeUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Lamp Wattage"
                                value={wattage}
                                onChange={(e) => { wattageUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Lamp Length"
                                value={length}
                                onChange={(e) => { lengthUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Button onClick={handleShowDriver} className="inputBtn borderBlue" >
                                {driver ? driver : 'Driver'}  </Button>
                            <Modal size="lg" show={showDriver} onHide={handleCloseDriver}>
                                <Modal.Header closeButton>
                                    <Modal.Title> Driver List :  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Control className="clientTableFormControl" type="text"
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
                                                    <th> Wattage </th>
                                                    <th> Size </th>
                                                    {/* <th> Pin </th> */}
                                                    {/* <th> Driver </th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    driverList.length > 0 && driverList.map((item, index) => {
                                                        return (
                                                            <tr onClick={() => {
                                                                driverUpdate(item.id)
                                                                showDriverUpdate(false)
                                                                searchDriverUpdate('')
                                                            }}
                                                                key={index}>

                                                                <td> {item.id} </td>
                                                                <td> {item.make} </td>
                                                                <td> {item.wattage} </td>
                                                                <td> {item?.size} </td>
                                                                {/* <td> {item.pin} </td> */}
                                                                {/* <td> {item.driverId} </td> */}
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    }
                                </Modal.Body>
                            </Modal>
                        </Col>

                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Lamp Pin"
                                as="select" custom
                                value={pin}
                                onChange={(e) => { pinUpdate(e.target.value) }}
                            >
                                <option value={''}> Number of Pins </option>
                                <option value={'2'}> 2 </option>
                                <option value={'4'}> 4 </option>
                                <option value={'other'}> Other </option>
                            </Form.Control>

                        </Col>

                        {
                            pin == 'other' &&
                            <Col sm={4}>
                                <Form.Control required className="clientTableFormControl"
                                    type="text" placeholder="Lamp Pin Description"
                                    value={description}
                                    onChange={(e) => { descriptionUpdate(e.target.value) }}
                                />
                            </Col>
                        }

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

export default LampTable