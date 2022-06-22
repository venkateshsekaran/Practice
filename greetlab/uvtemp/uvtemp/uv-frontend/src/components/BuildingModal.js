import React, { useState, useEffect } from 'react'
import { Table, Modal, Button } from "react-bootstrap"

const BuildingModal = (props) => {

    return (
        <Modal size="lg" show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title> Building No : {props.address.buildingNo}  </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                            props.address.length > 0 && props.address.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td> {item.id} </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    )
}
export default BuildingModal