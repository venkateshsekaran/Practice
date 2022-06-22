import React, { useState, useEffect, useRef } from 'react'
import { Table, Card, Button, Form, Spinner } from "react-bootstrap"
import AdminLayout from "../components/AdminLayout"
import Axios from "axios"
import config from "../config/config"
import { useHistory } from 'react-router-dom'
import { toast } from "react-toastify"
import DeleteModal from '../components/DeleteModal'
import EditUVHealModal from '../components/EditUVHealModal'
import SearchBar from "../components/SearchBar"
import handleDownload from "./commomFunction"
import ReactToPrint from 'react-to-print'

const UVHealModelList = () => {
    const refs = useRef()
    const history = useHistory()
    const [show, setShow] = useState(false)
    const [editShow, editSetShow] = useState(false)
    const [isLoading, isLoadingUpdate] = useState(false)
    const [isEditLoading, isEditLoadingUpdate] = useState(false)
    const [selectedId, selectedIdUpdate] = useState('')
    const [editObj, editObjUpdate] = useState({})
    const [isDeleteLoading, isDeleteLoadingUpdate] = useState(false)
    const [data, dataUpdate] = useState([])
    const [editRefresh, editRefreshUpdate] = useState(false)
    const [deleteRefresh, deleteRefreshUpdate] = useState(false)
    const [searchValue, searchValueUpdate] = useState('')

    useEffect(() => {
        isLoadingUpdate(true)
        const url = `${config.BASE_API_URL}common/getUvhealModelList`
        // const data = {}
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, {} , configs)
            .then((res) => {
                isLoadingUpdate(false)
                if (res.data.code == 200) {
                    dataUpdate([...res.data.responseData])
                }
                console.log(res.data)
            })
            .catch((error) => {
                isLoadingUpdate(false)
                console.log(error, "err")
            })
    }, [editRefresh, deleteRefresh])

    const handleEdit = (item) => {
        isEditLoadingUpdate(true)
        const url = `${config.BASE_API_URL}common/updateUvhealModelList`
        const data = { uvHeal: editObj }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        Axios.post(url, data, configs)
            .then((res) => {
                isEditLoadingUpdate(false)
                editSetShow(false)
                if (res.data?.code == 200) {
                    editRefreshUpdate(!editRefresh)
                    toast(res.data?.message)
                }
                console.log(res.data)
            })
            .catch((error) => {
                isEditLoadingUpdate(false)
                editSetShow(false)
                console.log(error, "err")
            })
    }

    const handleDelete = (item) => {
        isDeleteLoadingUpdate(true)
        const url = `${config.BASE_API_URL}common/deleteUvhealModel`
        const data = { uvHealId: item }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        Axios.post(url, data, configs)
            .then((res) => {
                isDeleteLoadingUpdate(false)
                setShow(false)
                if (res.data?.code == 200) {
                    deleteRefreshUpdate(!deleteRefresh)
                    toast(res.data?.message)
                }
                console.log(res.data)
            })
            .catch((error) => {
                isDeleteLoadingUpdate(false)
                setShow(false)
                console.log(error, "err")
            })
    }

    const handleChange = (e) => {
        editObjUpdate({ ...editObj, [e.target.name]: e.target.value })
    }
console.log("DATATTTT ==========>>>>",data)
    return (
        <AdminLayout>
            <div className="float-left">
                <h1>UV Heal Model  Details</h1>
            </div>
            <div className="float-right">
                <ReactToPrint
                    trigger={() => <Button className="mr-2"> Print </Button>}
                    content={() => refs.current}
                />
                {/* <Button onClick={() => handleDownload({ html: '#table' })}> Download as pdf </Button> */}
                <SearchBar value={searchValue} onChange={(e) => { searchValueUpdate(e.target.value) }} />
                <Button onClick={() => { history.push('/uvheal-model') }}
                    variant="primary" >
                    Add UV Heal Model Details </Button>
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
                <>
                    <Table ref={refs} id="table" striped bordered hover>
                        <thead>
                            <tr>
                                <th>Model ID</th>
                                {/* <th> Model Name </th> */}
                                <th> Model Type </th>
                                <th> No of Drivers </th>
                                <th> Driver ID </th>
                                <th> No of Lamps </th>
                                <th> Lamp List </th>
                                <th> Actions </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.length > 0 && data.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> {item?.modelId} </td>
                                            {/* <td> {item?.modelName} </td> */}
                                            <td> {item?.modelType} </td>
                                            <td> {item?.noOfDrivers} </td>
                                            <td> {item?.driverId.map((driverItem,index) => <span key={index} className="borderLight" >{driverItem} </span>)} </td>
                                            <td> {item?.noOfLamps} </td>
                                            <td> {item?.lampList.map((lampItem,index) => <span key={index} className="borderLight" > {(typeof(lampItem) === "object") ? lampItem.id : lampItem} </span>)} </td>
                                            {/* <td> {item?.lampList.map((lampItem,index) => <span key={index} className="borderLight" > {console.log("type 0ffff =>>>>",typeof(lampItem))} </span>)} </td> */}
                                            <td> <Button size="sm" variant="primary" onClick={() => {
                                                editSetShow(true)
                                                editObjUpdate(item)
                                            }
                                            }> EDIT </Button> {' '}
                                                <Button size="sm" variant="danger" onClick={() => {
                                                    setShow(true)
                                                    selectedIdUpdate(item._id)
                                                }
                                                }> DELETE </Button> </td>

                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <DeleteModal
                        show={show}
                        setShow={(value) => setShow(value)}
                        isDeleteLoading={isDeleteLoading}
                        id={selectedId}
                        handleDelete={(id) => handleDelete(id)}
                    />
                    <EditUVHealModal
                        editShow={editShow}
                        editSetShow={(value) => editSetShow(value)}
                        isEditLoading={isEditLoading}
                        editObj={editObj}
                        handleChange={(e) => handleChange(e)}
                        handleEdit={(editObj) => handleEdit(editObj)}
                    />
                </>
            }
        </AdminLayout>
    )
}

export default UVHealModelList;