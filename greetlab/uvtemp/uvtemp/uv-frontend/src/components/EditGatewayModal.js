import React from 'react'
import { Modal, Button, Row, Col, Form } from "react-bootstrap"

const EditGatewayModal = (props) => {
    console.log(props, 'props')
    return (
        <Modal size="lg" show={props?.editShow} onHide={() => { props?.editSetShow(false) }}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={() => props?.handleEdit()}>
                    <Row>
                        <Col sm={2}>
                            <h6 className="mt-2"> Client ID </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control disabled={true} required className="clientTableFormControl"
                                type="text" placeholder="Client ID"
                                name="clientId"
                                value={props?.editObj?.clientId}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>
                        <Col sm={2}>
                            <h6 className="mt-2"> Gateway Id </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Gateway Id"
                                name="gatewayId"
                                value={props?.editObj?.gatewayId}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>
                        <Col sm={2}>
                            <h6 className="mt-2"> SQS Command Url </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="SQS Command Url"
                                name="sqsCommandUrl"
                                value={props?.editObj?.sqsCommandUrl}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>
                        <Col sm={2}>
                            <h6 className="mt-2"> SQS Status Url </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="SQS Status Url"
                                name="sqsStatusUrl"
                                value={props?.editObj?.sqsStatusUrl}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>

                        <Col sm={2}>
                            <h6 className="mt-2"> Gateway Description </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="Gateway Description"
                                name="gatewayDescription"
                                value={props?.editObj?.gatewayDescription}
                                onChange={(e) => { props?.handleChange(e) }}
                            />
                        </Col>
                        <Col sm={2}>
                            <h6 className="mt-2"> MAC Address </h6>
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl"
                                type="text" placeholder="MAC Address"
                                name="macAddress"
                                value={props?.editObj?.macAddress}
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

export default EditGatewayModal;