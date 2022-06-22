import React from 'react'
import { Modal, Button } from "react-bootstrap"
import AppLayout from "../components/AppLayout"
import { useState, useEffect } from 'react'
import Axios from "axios"
import config from "../config/config"
import '../css/RealTimeReports.css'

const RealTimeReports = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, dataUpdate] = useState({
    clientId: "1243123452345",
    clientName: "238rt24868726872",
    clientEmail: "pratik.c@morphedo.com",
    addresses: [
      {
        buildingNo: "108",
        address: "Noida",
        floors: [
          {
            floorNo: "4",
            ahu: [
              {
                name: "the",
                AHUNumber: 1,
                CFM: 2,
                heightOfCoil: "123",
                widthOfCoil: "123",
                AHUMake: "12313",
                starterPanel: "yes",
                limitSwitch: "true",
                controllerId: "13141",
                UVhealCoilModel: "1231441414",
                floorNo: "1"
              },
              {
                name: "the",
                AHUNumber: 1,
                CFM: 2,
                heightOfCoil: "123",
                widthOfCoil: "123",
                AHUMake: "12313",
                starterPanel: "yes",
                limitSwitch: "true",
                controllerId: "13141",
                UVhealCoilModel: "1231441414",
                floorNo: "1"
              }
            ],
            duct: [{
              name: 'namee'
            }]
          }
        ]
      },
      {
        buildingNo: "108",
        address: "Noida",
        floors: [
          {
            floorNo: "4",
            ahu: [
              {
                name: "the",
                AHUNumber: 1,
                CFM: 2,
                heightOfCoil: "123",
                widthOfCoil: "123",
                AHUMake: "12313",
                starterPanel: "yes",
                limitSwitch: "true",
                controllerId: "13141",
                UVhealCoilModel: "1231441414",
                floorNo: "1"
              },
              {
                name: "the",
                AHUNumber: 1,
                CFM: 2,
                heightOfCoil: "123",
                widthOfCoil: "123",
                AHUMake: "12313",
                starterPanel: "yes",
                limitSwitch: "true",
                controllerId: "13141",
                UVhealCoilModel: "1231441414",
                floorNo: "1"
              }
            ],
            duct: [{
              name: 'namee'
            }]
          }
        ]
      }
    ]
  })
  useEffect(() => {
    const url = `${config.BASE_API_URL}client/getClientInfo`
    const data = { clientId: localStorage.getItem('clientId') }
    const configs = { headers: { authorization: localStorage.getItem('token') } }
    console.log('form submit', url, data, configs)
    Axios.post(url, data, configs)
      .then((res) => {
        if (res.data.code == 200) {
          dataUpdate(res.data.responseData)
        }
        console.log(res.data, "clint id data")
      })
      .catch((error) => {
        console.log(error, "err")
      })
  }, [])

  const handleGetId =   (ahuItem) => {
    const url = `${config.BASE_API_URL}client/getControllerDetail`
    const data = { controllerId: ahuItem.controllerId }
    const configs = { headers: { authorization: localStorage.getItem('token') } }
    console.log('form submit', url, data, configs)
    Axios.post(url, data, configs)
      .then((res) => {
        if (res.data.code == 200) {
          // dataUpdate(res.data.responseData[3])
        }
        console.log(res.data, "getControllerDetails")
      })
      .catch((error) => {
        console.log(error, "err")
      })
  }

  return (
    <AppLayout>
      <h2 className="heading"> Real Time Reports</h2>
      <table className="myTable2">
        <tbody>
          <tr>
            <td className="table">Client Id : {data.clientId}</td>
          </tr>
          <tr>
            <td className="table">Client Email : {data.clientEmail}</td>
          </tr>
          <tr>
            <td className="table">Client Name : {data.clientName}</td>
          </tr>

        </tbody>
      </table>
      <div>
        <p className="text-center myfont backEE"> Addresses :</p>
        {
          data.addresses.length > 0 && data.addresses.map((address, index) => {
            return (
              <div className="building">
                <p>   Building No  :   {address.buildingNo}  </p>
                <p>   Address  :   {address.address} </p>
                <p className="text-center myfont backEE"> Floors :</p>
                {
                  address.floors.length > 0 && address.floors.map((floor, index) => {
                    return (
                      <div>
                        floorNo : {floor.floorNo}
                        <div>
                          <p className="text-center color1"> AHU Table :</p>
                          <table className="myTable" >
                            <thead>
                              <tr>
                                <th>                      AHUMake          </th>
                                <th>                      AHUNumber        </th>
                                <th>                     CFM          </th>
                                <th>                    UVhealCoilModel         </th>
                                <th>                      controllerId         </th>
                                <th>                      heightOfCoil        </th>
                                <th>                      limitSwitch       </th>
                                <th>                      Name       </th>
                                <th>                      starterPanel       </th>
                                <th>                      width of coil       </th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                floor.ahu && floor.ahu.length > 0 && floor.ahu.map((ahuItem, index) => {
                                  return (
                                    <tr>
                                      <td>      {ahuItem.AHUMake} </td>
                                      <td>        {ahuItem.AHUNumber} </td>
                                      <td>      {ahuItem.CFM} </td>
                                      <td>          {ahuItem.UVhealCoilModel} </td>
                                      <td>
                                        <Button size="sm"
                                         onClick={()=> handleGetId(ahuItem)}>
                                          {ahuItem.controllerId}
                                        </Button>
                                      </td>
                                      <td>        {ahuItem.heightOfCoil} </td>
                                      <td>        {ahuItem.limitSwitch} </td>
                                      <td>        {ahuItem.name} </td>
                                      <td>        {ahuItem.starterPanel} </td>
                                      <td>        {ahuItem.widthOfCoil} </td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                        </div>

                        <div>
                          <p className="text-center color1">Duct Table :</p>
                          <table className="myTable" >
                            <thead>
                              <tr>
                                <th>                      Duct Id         </th>
                                <th>                      Duct Height       </th>
                                <th>                     Duct Width       </th>
                                <th>                    Duct Length         </th>
                                <th>                      CFM         </th>
                                <th>                      UV heal duct model         </th>
                                <th>                      Controller ID      </th>
                              </tr>
                            </thead>
                            <tbody>
                              {
                                floor.duct && floor.duct.length > 0 && floor.duct.map((ductItem, index) => {
                                  return (
                                    <tr>
                                      <td>      {ductItem.ductId} </td>
                                      <td>        {ductItem.ductHeight} </td>
                                      <td>      {ductItem.ductLength} </td>
                                      <td>          {ductItem.ductMaterial} </td>
                                      <td>       {ductItem.CFM} </td>
                                      <td>        {ductItem.UVhealDuctModel} </td>
                                      <td>        {ductItem.controllerId} </td>
                                    </tr>
                                  )
                                })
                              }
                            </tbody>
                          </table>
                        </div>


                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      <Modal show={show} onHide={handleClose}>
        
      </Modal>
    </AppLayout>
  )
}

export default RealTimeReports;