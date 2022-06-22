import React from 'react'
import { Modal, Button, Row, Col, Form } from "react-bootstrap"

const EditModal = (props) => {

    return (
        <Modal size="lg" show={props?.editShow} onHide={() => { props?.editSetShow(false) }}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={() => props?.handleEdit()}>
                    <Row>
                        <Col sm={2}>
                            <h6 className="mt-2"> Driver ID </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Driver ID"
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
                            <h6 className="mt-2"> Size </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Size"
                                name="size"
                                value={props?.editObj?.size}
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

export default EditModal;