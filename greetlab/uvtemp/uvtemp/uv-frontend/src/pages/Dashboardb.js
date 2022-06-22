import React, { useState, useEffect } from "react";
import { Row, Col, Form, Spinner, Table } from "react-bootstrap";
import AppLayout from "../components/AppLayout"
import Axios from "axios"
import config from "../config/config"

const Dashboard = () => {

  const [clientDetails, clientDetailsUpdate] = useState('')
  const [clientAddress, clientAddressUpdate] = useState('')

  const [buildingNo, buildingNoUpdate] = useState('')
  const [floors, floorsUpdate] = useState('')
  const [isLoading, isLoadingUpdate] = useState(false)

  const [floorsList, floorsListUpdate] = useState([])
  const [data, dataUpdate] = useState([])
  const [singleClient, singleClientUpdate] = useState('')
  const [ahuSelected, ahuSelectedUpdate] = useState('')
  const [controllerIdList, controllerIdListUpdate] = useState(['cid1', 'cid2', 'cid3'])
  const [controllerIdSelected, controllerIdSelectedUpdate] = useState('id3')

  const [ahu, ahuUpdate] = useState([{ id: Math.random(), name: 'rf', AHUNumber: 'df', CFM: 'tgt', heightOfCoil: 'gg', widthOfCoil: 'ff', AHUMake: 'ff', starterPanel: 'ff', limitSwitch: 'yes', UVhealCoilModel: 'ddf', controllerId: 'jj' }])
  const [duct, ductUpdate] = useState([{ id: Math.random(), ductId: 'dd', ductHeight: 'gg', ductWidth: 'tt', ductLength: 'hh', ductMaterial: 'h', CFM: 'h', UVhealDuctModel: 'h', controllerId: 'jj' }])

  useEffect(() => {
    isLoadingUpdate(true)
    const url = `${config.BASE_API_URL}admin/getSingleClientDetails`
    const data = { clientId: localStorage.getItem('clientId') }
    const configs = { headers: { authorization: localStorage.getItem('token') } }
    console.log('form submit', url, data, configs)
    Axios.post(url, data, configs)
      .then((res) => {
        isLoadingUpdate(false)
        if (res.data.code == 200 && res.data.responseJson) {
          singleClientUpdate(res.data.responseJson)
        }
        console.log(res.data, "singleClientlist")
      })
      .catch((error) => {
        isLoadingUpdate(false)
        console.log(error, "err")
      })
  }, [])

  useEffect(() => {
    isLoadingUpdate(true)
    const url = `${config.BASE_API_URL}admin/getFloorListForBuildingNo`
    const data = { clientId: localStorage.getItem('clientId'), addressId: clientAddress, buildingNo: buildingNo }
    const configs = { headers: { authorization: localStorage.getItem('token') } }
    console.log('form submit', url, data, configs)
    Axios.post(url, data, configs)
      .then((res) => {
        isLoadingUpdate(false)
        if (res.data.code == 200 && res.data.responseJson) {
          floorsListUpdate(res.data.responseJson)
        }
        console.log(res.data, "floorsapi")
      })
      .catch((error) => {
        isLoadingUpdate(false)
        console.log(error.response, "err")
      })
  }, [buildingNo, clientAddress])

  useEffect(() => {
    isLoadingUpdate(true)
    const url = `${config.BASE_API_URL}admin/getAhuOrDuctList`
    const data = { clientId: localStorage.getItem('clientId'), addressId: clientAddress, floorNo: floors.split('*')[0], type: floors.split('*')[1] }
    const configs = { headers: { authorization: localStorage.getItem('token') } }
    console.log('form submit', url, data, configs)
    Axios.post(url, data, configs)
      .then((res) => {
        isLoadingUpdate(false)
        if (res.data.code == 200) {
          if (res.data.responseJson.ahu) {
            ahuUpdate(res.data.responseJson.ahu)
          }
          if (res.data.responseJson.duct) {
            ductUpdate(res.data.responseJson.duct)
          }
        }
        console.log(res.data, "floorsahuduct")
      })
      .catch((error) => {
        isLoadingUpdate(false)
        console.log(error, "errfloorsductahu")
      })
  }, [floors])

  useEffect(() => {
    isLoadingUpdate(true)
    const url = `${config.BASE_API_URL}admin/getControllerIdsForAhu`
    const data = {
      clientId: localStorage.getItem('clientId'), addressId: clientAddress,
      floorNo: floors.split('*')[0], type: floors.split('*')[1],
      AHUNumber: ahuSelected
    }
    // const data = { clientId: clientDetails, addressId: clientAddress, floorNo: JSON.parse(floors)?.floorNo, type: JSON.parse(floors)?.type }
    const configs = { headers: { authorization: localStorage.getItem('token') } }
    console.log('form submit', url, data, configs)
    Axios.post(url, data, configs)
      .then((res) => {
        isLoadingUpdate(false)
        if (res.data.code == 200 && res.data.responseData) {
          controllerIdListUpdate(res.data.responseData)
        }
      })
      .catch((error) => {
        isLoadingUpdate(false)
        console.log(error, "controllerlist")
      })
  }, [ahuSelected])


  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log({ clientAddress, clientDetails, buildingNo, floors })
  }
  return (
    <AppLayout>
      <h3 className="text-center mb-2"> Dashboard </h3>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row>

          <Col sm={3}>
            <Form.Control className="clientTableFormControl"
              placeholder="Client Address"
              name="clientAddress"
              value={clientAddress} onChange={(e) => { clientAddressUpdate(e.target.value) }}
              as="select" size="lg" custom >
              <option value={''}>Client Address</option>
              {
                singleClient &&
                singleClient?.addresses.length > 0 &&
                singleClient.addresses.map((addressItem, index) => {
                  return <option key={index} value={addressItem.addressId}>{addressItem.address} </option>
                })

              }
            </Form.Control>
          </Col>
          {
            clientAddress &&
            <Col sm={3}>
              <Form.Control className="clientTableFormControl"
                placeholder="Building no"
                name="buildingNo"
                value={buildingNo} onChange={(e) => { buildingNoUpdate(e.target.value) }}
                as="select" size="lg" custom >
                <option value={''}>Building no</option>
                {
                  singleClient.addresses.length > 0 &&
                  singleClient.addresses.map((addressItem, index) => {
                    return <option value={addressItem.buildingNo}>{addressItem.buildingNo} </option>
                  })

                }
              </Form.Control>
            </Col>
          }
          {
            clientAddress && buildingNo &&
            <Col sm={3}>
              <Form.Control className="clientTableFormControl" placeholder="floors"
                name="floors"
                value={floors} onChange={(e) => { floorsUpdate(e.target.value) }}
                as="select" size="lg" custom >
                <option value={''}>Floors</option>
                {
                  floorsList.length > 0 && floorsList.map((floorItem, index) => {
                    return <option value={`${floorItem.floorNo}*${floorItem.type}`}> {floorItem.floorNo}  </option>
                  })
                }
              </Form.Control>
            </Col>
          }
          {
            clientDetails && clientAddress && buildingNo && floors && ahu.length > 0 &&
            <Col sm={3}>
              <Form.Control className="clientTableFormControl"
                name="ahu"
                value={ahuSelected}
                onChange={(e) => { ahuSelectedUpdate(e.target.value) }}
                as="select" size="lg" custom >
                <option value={''}> AHU Number </option>
                {
                  ahu.length > 0 && ahu.map((ahuItem, index) => {
                    return <option key={index} value={ahuItem.AHUNumber}> {ahuItem.AHUNumber}  </option>
                  })
                }
              </Form.Control>
            </Col>
          }
          {
            clientDetails && clientAddress && buildingNo && floors && ahuSelected &&
            <Col sm={3}>
              <Form.Control className="clientTableFormControl"
                name="ahu"
                value={controllerIdSelected}
                onChange={(e) => { controllerIdSelectedUpdate(e.target.value) }}
                as="select" size="lg" custom >
                <option value={''}> Controller Id </option>
                {
                  controllerIdList.length > 0 && controllerIdList.map((controllerIdItem, index) => {
                    return <option key={index} value={controllerIdItem}> {controllerIdItem}  </option>
                  })
                }
              </Form.Control>
            </Col>
          }

          {/* {clientAddress && buildingNo && floors && ahu.length > 0 &&
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th> Name </th>
                  <th> AHU Number </th>
                  <th> CFM </th>
                  <th> Height of coil </th>
                  <th> Width of coil </th>
                  <th> AHU Make </th>
                  <th> Starter Panel </th>
                  <th> Limit Switch </th>
                  <th> UV Heal Coil Model </th>
                  <th> Controller Id </th>
                </tr>
              </thead>
              <tbody>
                {
                  ahu.length > 0 && ahu.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td> {item.name} </td>
                        <td> {item.AHUNumber} </td>
                        <td> {item.CFM} </td>
                        <td> {item.heightOfCoil} </td>
                        <td> {item.widthOfCoil} </td>
                        <td> {item.AHUMake} </td>
                        <td> {item.starterPanel} </td>
                        <td> {item.limitSwitch} </td>
                        <td> {item.UVhealCoilModel} </td>
                        <td> {item.controllerId} </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          } */}


          {
            isLoading &&
            <Col sm={3}>
              <Spinner animation="border" role="status" />
            </Col>
          }

        </Row>
      </Form>
      {
        clientDetails && clientAddress && buildingNo && floors && ahuSelected && controllerIdSelected &&
        < iframe width="100%" height="1000px"
          style={{ border: 'none' }}
          src={`${config.BASE_API_URL}uploads/simreport.html`}
          alt="report.html" />

      }
    </AppLayout>
  );
}

export default Dashboard;

