import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Spinner, Modal, Form } from "react-bootstrap"
import AdminLayout from "../components/AdminLayout"
import Axios from "axios"
import config from "../config/config"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import DeleteModal from "../components/DeleteModal"
import EditClientModal from "../components/EditClientModal"
import SearchBar from "../components/SearchBar"
import Gateway from "./Gateway"
import GatewayList from './GatewayList'
import handleDownload from './commomFunction'
import ReactToPrint from 'react-to-print'

const ClientList = () => {
    const refs = useRef()
    const history = useHistory()
    const [isLoading, isLoadingUpdate] = useState(false)
    const [isEditLoading, isEditLoadingUpdate] = useState(false)
    const [isDeleteLoading, isDeleteLoadingUpdate] = useState(false)
    const [data, dataUpdate] = useState([])
    const [show, setShow] = useState(true);
    const [deleteShow, deleteSetShow] = useState(false);
    const [editShow, editSetShow] = useState(false);
    const [viewShow, viewSetShow] = useState(false);
    const [gatewayShow, gatewaySetShow] = useState(false);

    const [clientId, clientIdUpdate] = useState('')
    const [editObj, editObjUpdate] = useState({})
    const [viewObj, viewObjUpdate] = useState({})
    const [searchValue, searchValueUpdate] = useState('')
    const [passwordConfirmShow, passwordConfirmSetShow] = useState(false)
    const [password, passwordUpdate] = useState('')
    const [editViewToggle, editViewToggleUpdate] = useState(false)
    const [editRefresh, editRefreshUpdate] = useState(false)
    const [deleteRefresh, deleteRefreshUpdate] = useState(false)

    useEffect(() => {
        isLoadingUpdate(true)
        const url = `${config.BASE_API_URL}admin/getClientList`
        const data = {}
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.get(url, configs)
            .then((res) => {
                isLoadingUpdate(false)
                if (res.data.code == 200) {
                    dataUpdate(res.data.responseData)
                }
                console.log("INSPECT ===>>>>", res.data)
            })
            .catch((error) => {
                isLoadingUpdate(false)
                console.log(error.response, "err")
            })
    }, [searchValue == '', deleteRefresh, editRefresh])

    useEffect(() => {
        isLoadingUpdate(true)
        const url = `${config.BASE_API_URL}admin/searchClient`
        const data = { searchString: searchValue }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                isLoadingUpdate(false)
                if (res.data.code == 200 && res.data.responseJSON) {
                    dataUpdate(res.data.responseJSON)
                }
                console.log(res.data, "res data ....")
            })
            .catch((error) => {
                isLoadingUpdate(false)
                console.log(error, "err")
            })
    }, [searchValue])

    const handleEdit = (item) => {
        isEditLoadingUpdate(true)
        const url = `${config.BASE_API_URL}admin/updateClient`
        const data = { clientData: editObj }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log(url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                isEditLoadingUpdate(false)
                if (res.data?.code == 200) {
                    editRefreshUpdate(!editRefresh)
                    toast(res.data?.message)
                    editSetShow(false)
                }
                console.log(res.data)
            })
            .catch((error) => {
                isEditLoadingUpdate(false)
                console.log(error, "err")
            })
    }
    const handleDelete = (item) => {
        passwordConfirmSetShow(true)
        deleteSetShow(false)
    }
    const handleDeleteSubmit = (item) => {
        if (!password) {
            toast('Please Enter Password.')
            passwordUpdate("")
        } else {
            isDeleteLoadingUpdate(true)
            const url = `${config.BASE_API_URL}admin/deleteClient`
            const data = { clientId, password }
            const configs = { headers: { authorization: localStorage.getItem('token') } }
            console.log(url, data, configs)
            Axios.post(url, data, configs)
                .then((res) => {
                    isDeleteLoadingUpdate(false)
                    passwordUpdate("")
                    if (res?.data?.code == 200) {
                        passwordConfirmSetShow(false)
                        deleteRefreshUpdate(!deleteRefresh)
                    }
                    if (res?.data?.code == 200 || res?.data?.code == 403) {
                        toast(res?.data?.message)
                    }
                })
                .catch((error) => {
                    isDeleteLoadingUpdate(false)
                    console.log(error, "err")
                })
        }
    }

    const handleChange = (e, addressItem, floorItem, ahuItem, ductItem) => {
        if (addressItem && floorItem) {
            const addressObj = editObj.addresses.map((addressObjItem, addressObjIndex) => {
                if (addressObjItem == addressItem) {
                    const floorsObj = addressItem.floors.map((floorObjItem, floorObjIndex) => {
                        if (floorObjItem == floorItem) {
                            if (e.target.name == 'floorNo') {
                                return { ...floorObjItem, floorNo: { ...floorItem.floorNo, floorNo: e.target.value } }
                            } else if (ahuItem) {
                                const ahuArr = floorItem.ahu.map((ahuObjItem, ahuObjIndex) => {
                                    if (ahuObjItem == ahuItem) {
                                        console.log(ahuObjItem, e.target)
                                        if (e.target.name == 'UVHealCoilModel' || e.target.name == 'heightOfCoil' || e.target.name == 'widthOfCoil' || e.target.name == 'controllerId') {
                                            return { ...ahuObjItem, coil: { ...ahuItem.coil, [e.target.name]: e.target.value } }
                                        } else if (ductItem) {
                                            const ductArr = ahuItem.duct.map((ductObjItem, ductObjIndex) => {
                                                if (ductObjItem == ductItem) {
                                                    if (e.target.name == 'controllerId' && ductItem) {
                                                        return { ...ductObjItem, controllerId: e.target.value }
                                                    } else {
                                                        return { ...ductObjItem, [e.target.name]: e.target.value }
                                                    }
                                                } else {
                                                    return { ...ductObjItem }
                                                }
                                            })
                                            return { ...ahuObjItem, duct: ductArr }
                                        } else {
                                            return { ...ahuObjItem, [e.target.name]: e.target.value }
                                        }
                                    }
                                })
                                return { ...floorObjItem, ahu: ahuArr }
                            } else {
                                return { ...floorObjItem }
                            }
                        }
                    })
                    return { ...addressObjItem, floors: floorsObj }
                }
            })
            editObjUpdate({ ...editObj, addresses: addressObj })
        }
        else if (addressItem) {
            console.log(addressItem)
            const addressObj = editObj.addresses.map((addressObjItem, addressObjIndex) => {
                if (addressObjItem == addressItem) {
                    return { ...addressObjItem, [e.target.name]: e.target.value }
                }
            })
            editObjUpdate({ ...editObj, addresses: addressObj })
        } else {
            editObjUpdate({ ...editObj, [e.target.name]: e.target.value })
        }
    }

    return (
        <AdminLayout >
            <div className="float-left">
                <h1>Client  Details</h1>
            </div>
            <div className="float-right">
                {/* <ReactToPrint
                    trigger={() => <Button className="mr-2"> Print </Button>}
                    content={() => refs.current}
                /> */}
                {/* <Button onClick={() => handleDownload({ html: '#table' })}> Download as pdf </Button> */}
                <SearchBar value={searchValue} onChange={(e) => { searchValueUpdate(e.target.value) }} />
                <Button onClick={() => { history.push('/client-table') }}
                    variant="primary" >
                    Add Client Details </Button>
            </div>
            <div className="clear-both"></div>

            {isLoading &&
                <div className="mt-3 d-flex justify-content-center">
                    <Spinner role="status"
                        animation="border" />
                </div>
            }
            {
                !isLoading &&
                <Table ref={refs} id="table" striped bordered hover>
                    <thead>
                        <tr>
                            <th> Client Id</th>
                            <th> Client Name </th>
                            <th> Client Email </th>
                            <th> Manage Gateways </th>
                            <th> Actions </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.length > 0 && data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td> {item.clientId} </td>
                                        <td> {item.clientName} </td>
                                        <td> {item.clientEmail} </td>
                                        <td>
                                            <Button size="sm" variant="primary"
                                                onClick={() => {
                                                    gatewaySetShow(true)
                                                    clientIdUpdate(item.clientId)
                                                }} >
                                                MANAGE GATEWAY
                                        </Button>
                                        </td>
                                        <td>
                                            <Button size="sm" className="mr-2" variant="success"
                                                onClick={() => {
                                                    editSetShow(true)
                                                    editViewToggleUpdate(true)
                                                    editObjUpdate(item)
                                                }
                                                }> VIEW </Button>
                                            <Button size="sm" className="mr-2" variant="primary"
                                                onClick={() => {
                                                    editSetShow(true)
                                                    editViewToggleUpdate(false)
                                                    editObjUpdate(item)
                                                }
                                                }> EDIT </Button>
                                            <Button size="sm" className="mr-2" variant="danger"
                                                onClick={() => {
                                                    deleteSetShow(true)
                                                    clientIdUpdate(item.clientId)
                                                }}> DELETE </Button>
                                        </td>

                                        {/* <td> {item.addresses.map((address, index) => {
                                        return (<>
                                            <span> { address.buildingNo } </span>
                                            <BuildingModal
                                                show={show}
                                                handleClose={handleClose}
                                                handleShow={handleShow}
                                                key={index}
                                                address={address} />
                                       </> )
                                    })} </td> */}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <DeleteModal show={deleteShow}
                        setShow={deleteSetShow}
                        handleDelete={handleDelete}
                        isDeleteLoading={isDeleteLoading}
                    />

                    <EditClientModal
                        editViewToggle={editViewToggle}
                        editShow={editShow}
                        editSetShow={editSetShow}
                        editObj={editObj}
                        editObjUpdate={editObjUpdate}
                        handleChange={handleChange}
                        handleEdit={handleEdit}
                        isEditLoading={isEditLoading}
                    />


                    {/* <ViewModal
                        viewShow={viewShow}
                        viewSetShow={viewSetShow}
                        viewObj={viewObj}
                    /> */}
                    <Modal show={passwordConfirmShow} onHide={() => passwordConfirmSetShow(false)} >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Form>
                            <div className="text-center mt-2 mb-2"> Please Enter Admin Password. </div>
                            <Form.Control
                                type="password"
                                style={{ width: '90%' }}
                                className="clientTableFormControl m-3"
                                placeholder="Admin Password"
                                name="adminPassword"
                                value={password}
                                onChange={(e) => { passwordUpdate(e.target.value) }}
                            />
                        </Form>
                        <Modal.Footer>
                            <Button variant="primary" onClick={() => {
                                passwordConfirmSetShow(false)
                                passwordUpdate('')
                            }}>
                                Cancel
          </Button>
                            <Button variant="primary" onClick={() => { handleDeleteSubmit() }}>
                                {isDeleteLoading ? 'Deleteing' : 'Submit'}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal size="xl" show={gatewayShow} onHide={() => gatewaySetShow(false)} >
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Gateway clientId={clientId}
                            gatewaySetShow={gatewaySetShow}
                        />
                        <GatewayList clientId={clientId} />
                    </Modal>
                </Table>
            }
        </AdminLayout>
    )
}

export default ClientList;