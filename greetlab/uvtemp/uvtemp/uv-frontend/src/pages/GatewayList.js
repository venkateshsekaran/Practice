import React, { useState, useEffect } from 'react'
import { Table, Button, Spinner } from "react-bootstrap"
import AdminLayout from "../components/AdminLayout"
import Axios from "axios"
import config from "../config/config"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import DeleteModal from '../components/DeleteModal'
import EditGatewayModal from '../components/EditGatewayModal'
import ReadMoreReact from 'read-more-react';
import SearchBar from "../components/SearchBar"

const GatewayList = (props) => {

    const history = useHistory()
    const [show, setShow] = useState(false)
    const [editShow, editSetShow] = useState(false)
    const [isLoading, isLoadingUpdate] = useState(false)
    const [isEditLoading, isEditLoadingUpdate] = useState(false)
    const [selectedId, selectedIdUpdate] = useState('')
    const [editObj, editObjUpdate] = useState({})
    const [isDeleteLoading, isDeleteLoadingUpdate] = useState(false)
    // const [data, dataUpdate] = useState([{
    //     clientId: 'id', gatewayId: 'gid',
    //     gatewayDescription: 'gdesc', macAddress: 'madd', controllerId: ['f', 'g']
    // },
    // {
    //     clientId: 'id', gatewayId: 'gid',
    //     gatewayDescription: 'gdesc', macAddress: 'madd', controllerId: ['f', 'g']
    // }])
    const [data, dataUpdate] = useState([])
    const [editRefresh, editRefreshUpdate] = useState(false)
    const [deleteRefresh, deleteRefreshUpdate] = useState(false)
    const [searchValue, searchValueUpdate] = useState('')

    useEffect(() => {
        isLoadingUpdate(true)
        const url = `${config.BASE_API_URL}common/getGatewayList`
        const data = {}
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                isLoadingUpdate(false)
                if (res.data.code == 200) {
                    dataUpdate(res.data.responseData)
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
        const url = `${config.BASE_API_URL}common/updateGatewayList`
        const data = { gateway: editObj }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log(url, data, configs)
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
        const url = `${config.BASE_API_URL}common/deleteGateway`
        const data = { gatewayId: item }
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

    return (
        <>
            {/* <div className="float-left">
                <h1>Gateway  Details</h1>
            </div> */}
            {/* <div className="float-right">
                <SearchBar value={searchValue} onChange={(e) => { searchValueUpdate(e.target.value) }} />
                <Button onClick={() => { history.push('/gateway') }}
                    variant="primary" >
                    Add Gateway Details </Button>
            </div> */}
            {/* <div className="clear-both"></div> */}
            {
                isLoading &&
                <div className="mt-3 d-flex justify-content-center">
                    <Spinner role="status"
                        animation="border" />
                </div>
            }
            {
                !isLoading &&
                <>
                    <Table style={{ width: '97.5%' }} striped bordered hover>
                        <thead>
                            <tr style={{ fontSize: '16px' }}>
                                <th>Client Id</th>
                                <th>Gateway Id</th>
                                <th> Gateway Description </th>
                                <th> MAC Address </th>
                                <th>Sqs status url</th>
                                <th>Sqs command url</th>
                                <th> Controller Ids </th>
                                <th> Actions </th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.length > 0 && data.filter((item, index) => {
                                    return item.clientId == props?.clientId
                                })
                                    .map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td> {item?.clientId} </td>
                                                <td> {item?.gatewayId} </td>
                                                <td> {item?.gatewayDescription} </td>
                                                <td> {item?.macAddress} </td>

                                                <td>

                                                    {item?.sqsStatusUrls?.length > 0 &&
                                                        item?.sqsStatusUrls?.map((i, index) => {
                                                            return <div style={{ width: '180px', wordWrap: 'break-word' }}>
                                                                {/* {index + 1} : {i.slice(0, 15)} */}
                                                                <details>
                                                                    <summary>

                                                                    </summary>
                                                                    {i}
                                                                </details>
                                                            </div>
                                                        })}

                                                </td>
                                                <td>

                                                    {item?.sqsCommandUrls?.length > 0 &&
                                                        item?.sqsCommandUrls?.map((i, index) => {
                                                            return <div style={{ width: '180px', wordWrap: 'break-word' }}>
                                                                {/* {index + 1} : {i.slice(0, 15)} */}
                                                                <details>
                                                                    <summary>

                                                                    </summary>
                                                                    {i}
                                                                </details>
                                                            </div>
                                                        })}

                                                </td>
                                                <td> {item?.controllerIds?.length > 0 &&
                                                    item?.controllerIds?.map((i, index) => {
                                                        console.log(i);
                                                        return <span> {i.controllerId},  </span>
                                                    })} </td>
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
                        handleDelete={() => handleDelete(selectedId)}
                    />
                    <EditGatewayModal
                        editShow={editShow}
                        editSetShow={(value) => editSetShow(value)}
                        isEditLoading={isEditLoading}
                        editObj={editObj}
                        handleChange={(e) => handleChange(e)}
                        handleEdit={(editObj) => handleEdit(editObj)}
                    />
                </>
            }
        </>
    )
}

export default GatewayList;