import React from 'react'
import { Modal, Button } from "react-bootstrap"

const ControllerModal = (props) => {
    const { } = props
    return (
        <Modal show={props?.show} onHide={() => { props?.setShow(false) }}>
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body> Are you sure ?
                You want to delete.   </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={() => { props?.setShow(false) }}>
                    Cancel
          </Button>
                <Button variant="primary" onClick={() => { props?.handleDelete(props?.id) }}>
                    {props.isDeleteLoading ? 'Deleteing' : 'Submit'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ControllerModal;