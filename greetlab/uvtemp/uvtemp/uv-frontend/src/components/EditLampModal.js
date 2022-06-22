import React, { useState, useEffect } from 'react'
import { Modal, Button, Row, Col, Form, Table } from "react-bootstrap"
import Axios from "axios"
import config from "../config/config"

const EditLampModal = (props) => {
    console.log(props.editObj)
    const [driverList, driverListUpdate] = useState([{ id: 'driverId' }, { id: 'id2' }])
    const [searchDriver, searchDriverUpdate] = useState('')
    const [showDriver, setShowDriver] = useState(false)

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

    return (
        <Modal size="lg" show={props?.editShow} onHide={() => { props?.editSetShow(false) }}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={() => props?.handleEdit()}>
                    <Row>
                        <Col sm={2}>
                            <h6 className="mt-2"> Lamp ID </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Lamp ID"
                                name="id"
                                value={props?.editObj?.id}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>
                        <Col sm={2}>
                            <h6 className="mt-2"> Make </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Make"
                                name="make"
                                value={props?.editObj?.make}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>

                        <Col sm={2}>
                            <h6 className="mt-2"> Wattage </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Wattage"
                                name="wattage"
                                value={props?.editObj?.wattage}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>
                        <Col sm={2}>
                            <h6 className="mt-2"> Length </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Length"
                                name="length"
                                value={props?.editObj?.length}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>
                        <Col sm={2}>
                            <h6 className="mt-2"> Driver Id </h6>
                        </Col>
                        <Col sm={4}>
                            <Button onClick={() => { setShowDriver(true) }} className="inputBtn borderBlue" >
                                {props?.editObj?.driverId ? props?.editObj?.driverId : 'Driver'}  </Button>
                            <Modal size="lg" show={showDriver}
                                onHide={() => { setShowDriver(false) }}>
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
                                                    <th> Length </th>
                                                    <th> Pin </th>
                                                    <th> Driver </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    driverList.length > 0 && driverList.map((item, index) => {
                                                        return (
                                                            <tr onClick={() => {
                                                                const e = { target: { name: 'driverId', value: item.id } }
                                                                props?.handleChange(e)
                                                                setShowDriver(false)
                                                                searchDriverUpdate('')
                                                            }}
                                                                key={index}>

                                                                <td> {item.id} </td>
                                                                <td> {item.make} </td>
                                                                <td> {item.wattage} </td>
                                                                <td> {item.length} </td>
                                                                <td> {item.pin} </td>
                                                                <td> {item.driverId} </td>
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


                        {/* <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                as="select" custom
                                name="driverId"
                                value={props?.editObj?.driverId}
                                onChange={(e) => { props?.handleChange(e) }}
                            >
                                <option value={''}> Driver Id </option>
                                <option value={props?.editObj?.driverId}> {props?.editObj?.driverId} </option>
                                {
                                    driverList?.length > 0 &&
                                    driverList?.map((driverItm, index) => {
                                        return <option key={index} value={driverItm}> {driverItm} </option>
                                    })
                                }
                            </Form.Control>
                        </Col> */}
                        <Col sm={2}>
                            <h6 className="mt-2"> Pin </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                as="select" custom
                                name="pinNo"
                                value={props?.editObj?.pin?.pinNo}
                                onChange={(e) => { props?.handleChange(e) }}
                            >
                                <option value={''}> Number of Pins </option>
                                <option value={'2'}> 2 </option>
                                <option value={'4'}> 4 </option>
                                <option value={'other'}> Other </option>
                            </Form.Control>
                        </Col>

                        {
                            props?.editObj?.pin?.pinNo == 'other' &&
                            <>
                                <Col sm={2}>
                                    <h6 className="mt-2"> Description </h6>
                                </Col>
                                <Col sm={4}>
                                    <Form.Control required className="clientTableFormControl"
                                        type="text" placeholder="Description"
                                        name="description"
                                        value={props?.editObj?.pin?.description}
                                        onChange={(e) => { props?.handleChange(e) }}
                                    />
                                </Col>
                            </>
                        }

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

export default EditLampModal;