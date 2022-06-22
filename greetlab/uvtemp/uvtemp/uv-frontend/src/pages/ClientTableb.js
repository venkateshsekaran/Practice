import React, { useState, useEffect } from 'react'
import "../css/ClientTable.css"
import { Button, Form, Row, Col, Modal, Spinner } from "react-bootstrap"
import AdminLayout from "../components/AdminLayout"
import Axios from "axios"
import config from "../config/config"
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const ClientTable = () => {
    const history = useHistory()
    const [isLoading, isLoadingUpdate] = useState(false)

    const [showControllerId, setShowControllerId] = useState(false);
    const [showControllerIdDuct, setShowControllerIdDuct] = useState(false);
    const [showDuct, setShowDuct] = useState(false);
    const [showCoil, setShowCoil] = useState(false);

    const [clientId, clientIdUpdate] = useState('')
    const [clientName, clientNameUpdate] = useState('')
    const [clientEmail, clientEmailUpdate] = useState('')

    const [controllerId, controllerUpdate] = useState([{ controllerId: 'kjjk' }, { controllerId: 'dfsf' }])
    const [UVhealCoilModel, UVhealCoilModelUpdate] = useState([{ modelId: 'coil1' }, { modelId: 'coil2' }])
    const [UVhealDuctModel, UVhealDuctModelUpdate] = useState([{ modelId: 'duct1' }, { modelId: 'duct2' }])


    const [searchControllerId, searchControllerIdUpdate] = useState('')
    const [searchUVhealCoilModel, searchUVhealCoilModelUpdate] = useState('')
    const [searchUVhealDuctModel, searchUVhealDuctModelUpdate] = useState('')
    const [addresses, addressesUpdate] = useState(
        [{
            id: Math.random(), buildingNo: "", address: "", floors: [{
                id: Math.random(), floorNo: '', ahu: [
                    {
                        id: Math.random(), UVHealSystemType: '', name: '', AHUNumber: '', CFM: '', heightOfCoil: '', widthOfCoil: '', AHUMake: '', starterPanel: '', limitSwitch: '', UVhealCoilModel: '', controllerId: ''
                        , duct: [{ id: Math.random(), ductId: '', ductHeight: '', ductWidth: '', ductLength: '', ductMaterial: '', CFM: '', UVhealDuctModel: '', controllerId: '' }]
                    }
                ]
            }]
        }]
    )
    console.log(addresses, "state")
    useEffect(() => {
        const url = `${config.BASE_API_URL}admin/getControllerDataForId`
        const data = { searchString: searchControllerId }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                if (res.data.code == 200 && res.data.responseData) {
                    controllerUpdate(res.data.responseData)
                }
                console.log(res.data, "getControllerDataForId")
            })
            .catch((error) => {
                console.log(error, "err")
            })
    }, [searchControllerId])

    useEffect(() => {
        const url = `${config.BASE_API_URL}admin/getUvHealCoilModelList`
        const data = { searchString: searchUVhealCoilModel, type: 'coil' }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                console.log(res.data, "getUvHealCoilModelList")
                if (res.data.code == 200 && res.data.responseData) {
                    UVhealCoilModelUpdate(res.data.responseData)
                }
            })
            .catch((error) => {
                console.log(error.respose, "err")
            })
    }, [searchUVhealCoilModel])

    useEffect(() => {
        const url = `${config.BASE_API_URL}admin/getUvHealCoilModelList`
        const data = { searchString: searchUVhealDuctModel, type: 'duct' }
        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                console.log(res.data, "getUvHealDuctModelList")
                if (res.data.code == 200 && res.data.responseData) {
                    UVhealDuctModelUpdate(res.data.responseData)
                }
            })
            .catch((error) => {
                console.log(error.respose, "err")
            })
    }, [searchUVhealDuctModel])

    const handleSubmit = (e) => {
        e.preventDefault()
        isLoadingUpdate(true)
        const url = `${config.BASE_API_URL}admin/saveClient`
        const data = { clientData: { clientId, clientName, clientEmail, addresses } }

        const configs = { headers: { authorization: localStorage.getItem('token') } }
        console.log('form submit', url, data, configs)
        Axios.post(url, data, configs)
            .then((res) => {
                isLoadingUpdate(false)
                if (res.data.code == 200) {
                    toast(res.data.message)
                    history.push('/client-list')
                }
                console.log(res.data)
            })
            .catch((err) => {
                isLoadingUpdate(false)
                console.log(err.response.data)
            })
    }
    const handleChange = (e, addressItems, item, ahu) => {

        addressesUpdate(addresses?.map((i) => {
            if (i?.id == addressItems?.id) {
                const newad = i?.floors?.map((ind) => {
                    if (ind?.id == item?.id) {
                        const newadi = ind?.ahu?.map((i) => {
                            if (i?.id == ahu?.id) {
                                return { ...i, [e.target.name]: e.target.value }
                            } else {
                                return i
                            }
                        })
                        return { ...ind, ahu: newadi }
                    } else {
                        return ind
                    }
                })
                return { ...i, floors: newad }
            } else {
                return i
            }
        }))
        //   setShowControllerId(false)
        console.log("close list controller")
    }

    const handleDuctChange = (e, addressItems, item, ahu, duct) => {
        addressesUpdate(addresses?.map((i) => {
            if (i?.id == addressItems?.id) {
                const newad = i?.floors?.map((ind) => {
                    if (ind?.id == item?.id) {
                        const newadi = ind?.ahu?.map((it) => {
                            if (it?.id == ahu?.id) {
                                const newDuct = it.duct.map((newDuctItm, index) => {
                                    if (newDuctItm.id == duct.id) {
                                        console.log(newDuctItm, "newDuctItm")
                                        return { ...newDuctItm, [e.target.name]: e.target.value }
                                    } else {
                                        return newDuctItm
                                    }
                                })
                                console.log(newDuct, "newDuct")
                                return { ...it, duct: newDuct }
                            } else {
                                return it
                            }
                        })
                        return { ...ind, ahu: newadi }
                    } else {
                        return ind
                    }
                })
                return { ...i, floors: newad }

            } else {
                return i
            }
        }))
    }
    const handleBtnChange = (name, value, addressItems, item, ahu) => {
        console.log(name, value, addressItems, item, ahu, "tset")
        addressesUpdate(addresses?.map((i) => {
            if (i?.id == addressItems?.id) {
                const newad = i?.floors?.map((ind) => {
                    if (ind?.id == item?.id) {
                        const newadi = ind?.ahu?.map((i) => {
                            if (i?.id == ahu?.id) {
                                return { ...i, [name]: value }

                            } else {
                                return i
                            }
                        })
                        return { ...ind, ahu: newadi }
                    } else {
                        return ind
                    }
                })
                return { ...i, floors: newad }
            } else {
                return i
            }
        }))
    }

    const handleBtnChangeDuct = (name, value, addressItems, item, ahu, duct) => {
        addressesUpdate(addresses?.map((i) => {
            if (i?.id == addressItems?.id) {
                const newad = i?.floors?.map((ind) => {
                    if (ind?.id == item?.id) {
                        const newadi = ind?.ahu?.map((i) => {
                            if (i?.id == ahu?.id) {
                                const newDuct = i.duct.map((ductItm, index) => {
                                    if (ductItm.id == duct.id) {
                                        return { ...ductItm, [name]: value }
                                    } else {
                                        return ductItm
                                    }
                                })
                                return { ...i, duct: newDuct }
                            } else {
                                return i
                            }
                        })
                        return { ...ind, ahu: newadi }
                    } else {
                        return ind
                    }
                })
                return { ...i, floors: newad }
            } else {
                return i
            }
        }))
    }
    return (
        <AdminLayout>
            <div className="clientTableCont">
                <p className="clientTableHead">Client Details </p>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Client Id"
                                value={clientId}
                                onChange={(e) => { clientIdUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="text" placeholder="Client Name"
                                value={clientName}
                                onChange={(e) => { clientNameUpdate(e.target.value) }}
                            />
                        </Col>
                        <Col sm={4}>
                            <Form.Control required className="clientTableFormControl" type="email" placeholder="Client Email"
                                value={clientEmail}
                                onChange={(e) => { clientEmailUpdate(e.target.value) }}
                            />
                        </Col>
                    </Row>

                    <p className="addressesHead text-center">
                        Addresses :
                    </p>

                    {
                        addresses?.length > 0 && addresses?.map((addressItems) => {
                            return <div className="border">
                                <Row >
                                    <Col sm={6}>
                                        <Form.Control required className="clientTableFormControl" type="text" placeholder="Building No."
                                            value={addressItems?.buildingNo}
                                            onChange={(e) => {
                                                addressesUpdate(addresses?.map((i) => {
                                                    if (i.id == addressItems.id) {
                                                        return { ...i, buildingNo: e.target.value }
                                                    } else {
                                                        return i
                                                    }
                                                }))
                                            }} />
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Control required className="clientTableFormControl" type="text" placeholder="Address"
                                            value={addressItems?.address}
                                            onChange={(e) => {
                                                addressesUpdate(addresses?.map((i) => {
                                                    if (i.id == addressItems.id) {
                                                        return { ...i, address: e.target.value }
                                                    } else {
                                                        return i
                                                    }
                                                }))
                                            }}
                                        />
                                    </Col>
                                </Row>
                                {
                                    addressItems?.floors?.map((item, index) => {
                                        return (
                                            <div className="addressCard" key={index}>
                                                <Row>
                                                    <Col sm={5}>
                                                        <p className="addressesHead text-right pt-2"> Floor No :  </p>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Form.Control required className="clientTableFormControl" type="text" placeholder="Floor"
                                                            value={item?.floorNo}
                                                            onChange={(e) => {
                                                                addressesUpdate(addresses?.map((i) => {
                                                                    if (i?.id == addressItems?.id) {
                                                                        const newad = i?.floors?.map((ind) => {
                                                                            if (ind?.id == item?.id) {
                                                                                const indObj = { ...ind, floorNo: e.target.value }
                                                                                return indObj
                                                                            } else {
                                                                                return ind
                                                                            }
                                                                        })
                                                                        console.log(newad, "newad")
                                                                        return { ...i, floors: newad }
                                                                    } else {
                                                                        console.log("i")
                                                                        return i
                                                                    }
                                                                }))
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>


                                                {
                                                    item?.floorNo == '' ? '' :
                                                        (<>
                                                            {
                                                                item?.ahu?.map((ahu, index) => {
                                                                    return (<>
                                                                        <p key={index} className="clientTableHead"> AHU Details : </p>
                                                                        <Row>
                                                                            <Col sm={4}>    <Form.Control className="clientTableFormControl" type="text" placeholder="Name" name="name" value={ahu?.name} onChange={(e) => { handleChange(e, addressItems, item, ahu) }} />   </Col>
                                                                            <Col sm={4}>     <Form.Control className="clientTableFormControl" type="text" placeholder="AHU Number" name="AHUNumber" value={ahu?.AHUNumber} onChange={(e) => { handleChange(e, addressItems, item, ahu) }} /> </Col>
                                                                            <Col sm={4}>    <Form.Control className="clientTableFormControl" type="text" placeholder="AHU Model" name="ahuModel" value={ahu?.ahuModel} onChange={(e) => { handleChange(e, addressItems, item, ahu) }} />   </Col>
                                                                            <Col sm={4}>     <Form.Control className="clientTableFormControl" type="text" placeholder="CFM" name="CFM" value={ahu?.CFM} onChange={(e) => { handleChange(e, addressItems, item, ahu) }} /> </Col>

                                                                            <Col sm={4}>    <Form.Control className="clientTableFormControl" type="text" placeholder="AHU Make" name="AHUMake" value={ahu?.AHUMake} onChange={(e) => { handleChange(e, addressItems, item, ahu) }} /> </Col >
                                                                            <Col sm={4}>    <Form.Control className="clientTableFormControl" type="text" placeholder="Starter Panel Type"
                                                                                name="starterPanel"
                                                                                value={ahu?.starterPanel} onChange={(e) => { handleChange(e, addressItems, item, ahu) }} as="select" custom >
                                                                                <option>Starter Panel Type</option>
                                                                                <option>Star Delta</option>
                                                                                <option>Delta</option>
                                                                                <option>VFD</option>
                                                                                <option>Other</option>
                                                                            </Form.Control>
                                                                            </Col>

                                                                            <Col sm={12}>
                                                                                <Row className="mb-2">
                                                                                    <Col sm={4}>
                                                                                        <span>    Limit Switch : </span>
                                                                                    </Col>
                                                                                    <Col>
                                                                                        <div onChange={(e) => { handleChange(e, addressItems, item, ahu) }}>
                                                                                            <input type="radio" value="yes" name="limitSwitch" /> Yes {' '}
                                                                                            <input type="radio" value="no" name="limitSwitch" /> No {' '}
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>

                                                                            <Col sm={12}>
                                                                                <Row className="mb-2">

                                                                                    <Col sm={4}>
                                                                                        <span>    UV Heal System Type : </span>
                                                                                    </Col>
                                                                                    <Col>
                                                                                        <div className="mb-2" onChange={(e) => { handleChange(e, addressItems, item, ahu) }}>
                                                                                            <input type="radio" value="coil" name="UVHealSystemType" /> Coil {' '}
                                                                                            <input type="radio" value="duct" name="UVHealSystemType" /> Duct {' '}
                                                                                            <input type="radio" value="both" name="UVHealSystemType" /> Both {' '}
                                                                                        </div>
                                                                                    </Col>
                                                                                </Row>
                                                                                {
                                                                                    (ahu?.UVHealSystemType == 'coil' || ahu?.UVHealSystemType == 'both') &&
                                                                                    <p className="clientTableHead mt-3"> Coil Details : </p>
                                                                                }

                                                                            </Col>

                                                                            {
                                                                                (ahu?.UVHealSystemType == 'coil' || ahu?.UVHealSystemType == 'both') && <>
                                                                                    <Col sm={4}>

                                                                                        <Button onClick={() => { setShowCoil(true) }} className="inputBtn" >
                                                                                            UV Heal Coil Model  -  <span className="borderWhite">{ahu?.UVhealCoilModel} </span></Button>
                                                                                        <Modal show={showCoil} onHide={() => { setShowCoil(false) }}>
                                                                                            <Modal.Header closeButton>
                                                                                                <Modal.Title> UV Heal Coil Model : <span className="borderWhite"> {ahu?.UVhealCoilModel}</span> </Modal.Title>
                                                                                            </Modal.Header>
                                                                                            <Modal.Body>
                                                                                                <Form.Control className="clientTableFormControl" type="text"
                                                                                                    placeholder="Search"
                                                                                                    name="search"
                                                                                                    value={searchUVhealCoilModel}
                                                                                                    onChange={(e) => { searchUVhealCoilModelUpdate(e.target.value) }} />
                                                                                                {
                                                                                                    UVhealCoilModel.map((UVhealCoilModelItem, index) => {
                                                                                                        return <Button onClick={() => {
                                                                                                            handleBtnChange('UVhealCoilModel', UVhealCoilModelItem?.modelId, addressItems, item, ahu)
                                                                                                            setShowCoil(false)
                                                                                                        }}
                                                                                                            className="dropdownBtn mb-2" key={index} >
                                                                                                            {UVhealCoilModelItem?.modelId}
                                                                                                        </Button>
                                                                                                    })
                                                                                                }

                                                                                                {/* <Form.Control className="clientTableFormControl" type="text" placeholder="UV Heal Coil Model" name="UVhealCoilModel"
                                                                                                    value={ahu?.UVhealCoilModel} onChange={(e) => { handleChange(e, addressItems, item, ahu) }} /> */}
                                                                                            </Modal.Body>
                                                                                        </Modal>

                                                                                    </Col>
                                                                                    <Col sm={4}>
                                                                                        <Button onClick={() => { setShowControllerIdDuct(true) }} className="inputBtn borderBlue" >
                                                                                            Controller Id - <span className="borderWhite"> {ahu?.controllerId} </span>  </Button>
                                                                                        <Modal show={showControllerIdDuct}
                                                                                            onHide={() => { setShowControllerIdDuct(false) }} >
                                                                                            <Modal.Header closeButton>
                                                                                                <Modal.Title> Controller Id : <span className="borderWhite"> {ahu?.controllerId} </span></Modal.Title>
                                                                                            </Modal.Header>
                                                                                            <Modal.Body>
                                                                                                <Form.Control className="clientTableFormControl" type="text"
                                                                                                    placeholder="Search"
                                                                                                    name="search"
                                                                                                    value={searchControllerId}
                                                                                                    onChange={(e) => { searchControllerIdUpdate(e.target.value) }} />
                                                                                                {
                                                                                                    controllerId.map((controllerItem, index) => {
                                                                                                        return <Button onClick={() => {
                                                                                                            handleBtnChange('controllerId', controllerItem?.controllerId, addressItems, item, ahu)
                                                                                                            setShowControllerIdDuct(false)
                                                                                                        }}
                                                                                                            className="dropdownBtn mb-2"
                                                                                                            key={index} >
                                                                                                            {controllerItem?.controllerId}  </Button>
                                                                                                    })
                                                                                                }
                                                                                            </Modal.Body>
                                                                                        </Modal>
                                                                                    </Col>

                                                                                    <Col sm={4}>    <Form.Control className="clientTableFormControl" type="text" placeholder="Height of Coil" name="heightOfCoil" value={ahu?.heightOfCoil} onChange={(e) => { handleChange(e, addressItems, item, ahu) }} /> </Col>
                                                                                    <Col sm={4}>    <Form.Control className="clientTableFormControl" type="text" placeholder="Width of Coil" name="widthOfCoil" value={ahu?.widthOfCoil} onChange={(e) => { handleChange(e, addressItems, item, ahu) }} /> </Col>

                                                                                </>
                                                                            }
                                                                            <div className="mx-3">
                                                                                {(ahu?.UVHealSystemType == 'duct' || ahu?.UVHealSystemType == 'both') &&
                                                                                    ahu?.duct?.map((duct) => {
                                                                                        return (<>
                                                                                            <p key={duct} className="clientTableHead text-center"> Duct Details : </p>
                                                                                            <Row>
                                                                                                <Col sm={4}>
                                                                                                    <Button onClick={() => { setShowDuct(true) }} type="button"
                                                                                                        className="inputBtn" > UV Heal Duct Model - <span className="borderWhite"> {duct?.UVhealDuctModel} </span> </Button>
                                                                                                    <Modal show={showDuct}
                                                                                                        onHide={() => { setShowDuct(false) }}>
                                                                                                        <Modal.Header closeButton>
                                                                                                            <Modal.Title> UV Heal Duct Model : <span className="borderWhite"> {duct?.UVhealDuctModel}</span>  </Modal.Title>
                                                                                                        </Modal.Header>
                                                                                                        <Modal.Body>
                                                                                                            <Form.Control className="clientTableFormControl" type="text"
                                                                                                                placeholder="Search"
                                                                                                                name="search"
                                                                                                                value={searchUVhealDuctModel}
                                                                                                                onChange={(e) => { searchUVhealDuctModelUpdate(e.target.value) }} />
                                                                                                            {
                                                                                                                UVhealDuctModel.map((UVhealDuctModelItem, index) => {
                                                                                                                    return <Button onClick={() => {
                                                                                                                        handleBtnChangeDuct('UVhealDuctModel', UVhealDuctModelItem?.modelId, addressItems, item, ahu, duct)
                                                                                                                        setShowDuct(false)
                                                                                                                    }}
                                                                                                                        className="dropdownBtn mb-2" key={index} >
                                                                                                                        {UVhealDuctModelItem?.modelId}  </Button>
                                                                                                                })
                                                                                                            }
                                                                                                        </Modal.Body>
                                                                                                    </Modal>

                                                                                                </Col>
                                                                                                <Col sm={4}>
                                                                                                    <Button onClick={() => { setShowControllerId(true) }} type="button" className="inputBtn" >
                                                                                                        Controller Id - <span className="borderWhite">{duct?.controllerId}</span>  </Button>
                                                                                                    <Modal show={showControllerId}
                                                                                                        onHide={() => { setShowControllerId(false) }}>
                                                                                                        <Modal.Header closeButton>
                                                                                                            <Modal.Title> Controller Id : <span className="borderWhite"> {duct?.controllerId} </span> </Modal.Title>
                                                                                                        </Modal.Header>
                                                                                                        <Modal.Body>
                                                                                                            <Form.Control className="clientTableFormControl" type="text"
                                                                                                                placeholder="Search"
                                                                                                                name="search"
                                                                                                                value={searchControllerId}
                                                                                                                onChange={(e) => {
                                                                                                                    searchControllerIdUpdate(e.target.value)
                                                                                                                }} />
                                                                                                            {
                                                                                                                controllerId.map((controllerItem, index) => {
                                                                                                                    return <Button onClick={() => {
                                                                                                                        handleBtnChangeDuct('controllerId', controllerItem?.controllerId, addressItems, item, ahu, duct)
                                                                                                                        setShowControllerId(false)
                                                                                                                    }}
                                                                                                                        className="dropdownBtn mb-2"
                                                                                                                        key={index} >
                                                                                                                        {controllerItem?.controllerId}  </Button>
                                                                                                                })
                                                                                                            }

                                                                                                        </Modal.Body>
                                                                                                    </Modal>
                                                                                                </Col>

                                                                                                <Col sm={4}>    <Form.Control className="clientTableFormControl" type="text" placeholder="Duct Id" name="ductId" value={duct?.ductId}
                                                                                                    onChange={(e) => { handleDuctChange(e, addressItems, item, ahu, duct) }} />   </Col>
                                                                                                <Col sm={4}>     <Form.Control className="clientTableFormControl" type="text" placeholder="Duct Height" name="ductHeight" value={duct?.ductHeight} onChange={(e) => { handleDuctChange(e, addressItems, item, ahu, duct) }} /> </Col>
                                                                                                <Col sm={4}>     <Form.Control className="clientTableFormControl" type="text" placeholder="Duct Width" name="ductWidth" value={duct?.ductWidth} onChange={(e) => { handleDuctChange(e, addressItems, item, ahu, duct) }} /> </Col>
                                                                                                <Col sm={4}>    <Form.Control className="clientTableFormControl" type="text" placeholder="Duct Length" name="ductLength" value={duct?.ductLength} onChange={(e) => { handleDuctChange(e, addressItems, item, ahu, duct) }} /> </Col>
                                                                                                <Col sm={4}>    <Form.Control className="clientTableFormControl" type="text" placeholder="CFM" name="CFM" value={duct?.CFM} onChange={(e) => { handleDuctChange(e, addressItems, item, ahu, duct) }} /> </Col >
                                                                                            </Row>
                                                                                        </>)
                                                                                    })
                                                                                }
                                                                            </div>
                                                                        </Row>

                                                                        <Row>
                                                                            {(ahu?.UVHealSystemType == 'duct' || ahu?.UVHealSystemType == 'both') &&
                                                                                <Button className="ml-3 mt-2 mb-2" variant="primary"
                                                                                    onClick={() => {
                                                                                        addressesUpdate(addresses?.map((i) => {
                                                                                            if (i?.id == addressItems?.id) {
                                                                                                const floorsArr = i?.floors?.map((floor) => {
                                                                                                    if (floor?.id == item?.id) {

                                                                                                        const newAhu = floor?.ahu.map((ahuItem) => {
                                                                                                            if (ahuItem.id == ahu.id) {
                                                                                                                console.log(ahuItem, "ahuItem")
                                                                                                                const obj = { id: Math.random(), ductId: '', ductHeight: '', ductWidth: '', ductLength: '', ductMaterial: '', CFM: '', UVhealDuctModel: '', controllerId: '' }
                                                                                                                const ductObj = ahuItem?.duct
                                                                                                                const ductArr = [...ductObj, obj]
                                                                                                                return { ...ahuItem, duct: ductArr }
                                                                                                            } else {
                                                                                                                return ahuItem
                                                                                                            }
                                                                                                        })
                                                                                                        return { ...floor, ahu: newAhu }
                                                                                                    } else {
                                                                                                        return floor
                                                                                                    }
                                                                                                })
                                                                                                return { ...i, floors: floorsArr }
                                                                                            } else {
                                                                                                return i
                                                                                            }
                                                                                        }))
                                                                                    }}> Add More Duct Details + </Button>
                                                                            }
                                                                        </Row>
                                                                    </>)
                                                                })
                                                            }


                                                            <Row>
                                                                <Button className="ml-3 mt-2 mb-2" variant="primary"
                                                                    onClick={() => {
                                                                        addressesUpdate(addresses?.map((i) => {
                                                                            if (i?.id == addressItems?.id) {
                                                                                const floorsArr = i?.floors?.map((floor) => {
                                                                                    if (floor?.id == item?.id) {
                                                                                        console.log(true, floor)
                                                                                        const obj = {
                                                                                            id: Math.random(), duct: [{ id: Math.random(), ductId: '', ductHeight: '', ductWidth: '', ductLength: '', ductMaterial: '', CFM: '', UVhealDuctModel: '', controllerId: '' }]
                                                                                            , UVHealSystemType: '', name: '', AHUNumber: '', CFM: '', heightOfCoil: '', widthOfCoil: '', AHUMake: '', starterPanel: '', limitSwitch: '', UVhealCoilModel: '', controllerId: ''
                                                                                        }
                                                                                        const ahuObj = floor?.ahu
                                                                                        const ahuArr = [...ahuObj, obj]
                                                                                        return { ...floor, ahu: ahuArr }
                                                                                    } else {
                                                                                        console.log(false, floor)
                                                                                        return floor
                                                                                    }
                                                                                })
                                                                                return { ...i, floors: floorsArr }
                                                                            } else {
                                                                                return i
                                                                            }
                                                                        }))
                                                                    }}> Add More AHU Details + </Button>
                                                            </Row>

                                                        </>)
                                                }
                                            </div>)
                                    })
                                }
                                <div className="addressCont">
                                    <Button className="" variant="primary" onClick={() => {
                                        addressesUpdate(addresses?.map((newFloor) => {
                                            if (newFloor?.id == addressItems?.id) {
                                                const floorObj = {
                                                    id: Math.random(), floorNo: '',
                                                    ahu: [
                                                        {
                                                            id: Math.random(), UVHealSystemType: '', name: '', AHUNumber: '', CFM: '', heightOfCoil: '', widthOfCoil: '', AHUMake: '', starterPanel: '', limitSwitch: '', UVhealCoilModel: '', controllerId: ''
                                                            , duct: [{ id: Math.random(), ductId: '', ductHeight: '', ductWidth: '', ductLength: '', ductMaterial: '', CFM: '', UVhealDuctModel: '', controllerId: '' }]
                                                        }
                                                    ]
                                                }
                                                const arr = addressItems?.floors
                                                const newFloorsArr = [...arr, floorObj]
                                                return { ...newFloor, floors: newFloorsArr }
                                            } else {
                                                return newFloor
                                            }
                                        }))
                                    }}> Add Floor + </Button>
                                </div>
                            </div>
                        })
                    }

                    <div className="addressCont">
                        <Button variant="primary" onClick={() => {
                            addressesUpdate([...addresses, {
                                id: Math.random(), buildingNo: "", address: "", floors: [{
                                    id: Math.random(), floorNo: '', ahu: [
                                        {
                                            id: Math.random(), UVHealSystemType: '', name: '', AHUNumber: '', CFM: '', heightOfCoil: '', widthOfCoil: '', AHUMake: '', starterPanel: '', limitSwitch: '', UVhealCoilModel: '', controllerId: ''
                                            , duct: [{ id: Math.random(), ductId: '', ductHeight: '', ductWidth: '', ductLength: '', ductMaterial: '', CFM: '', UVhealDuctModel: '', controllerId: '' }]
                                        }
                                    ]
                                }]
                            }])
                        }}> Add Address + </Button>
                    </div>
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

export default ClientTable;