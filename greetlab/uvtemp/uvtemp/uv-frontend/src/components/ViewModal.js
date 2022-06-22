import React from 'react'
import { Modal, Button } from "react-bootstrap"

const ViewModal = ({ viewShow, viewSetShow, viewObj }) => {
    return (
        <Modal show={viewShow} onHide={() => { viewSetShow(false) }}  >
            ClientId :    {viewObj?.clientId} <br />
    ClientName :    {viewObj?.clientName} <br />
    ClientEmail :    {viewObj?.clientEmail} <br />
        </Modal>
    )
}

export default ViewModal;