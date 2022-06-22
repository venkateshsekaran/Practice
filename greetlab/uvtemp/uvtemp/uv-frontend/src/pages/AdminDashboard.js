import { useState, useEffect } from "react";
import "../css/SearchBar.css";
import { Row, Col, Form, Spinner, Table, Button } from "react-bootstrap";
import AdminLayout from "../components/AdminLayout";
import Axios from "axios";
import config from "../config/config";
import { toast } from "react-toastify";
import Switch from "react-switch";

const AdminDashboard = () => {
  const [isLoading, isLoadingUpdate] = useState(false);
  const [isLampLoading, isLampLoadingUpdate] = useState(false);

  const [toggleButton, setToggleButton] = useState(false);

  const [clientDetails, clientDetailsUpdate] = useState("");
  const [clientAddress, clientAddressUpdate] = useState("");
  const [buildingNo, buildingNoUpdate] = useState("");
  const [floors, floorsUpdate] = useState("");
  const [ahuSelected, ahuSelectedUpdate] = useState("");
  const [controllerIdSelected, controllerIdSelectedUpdate] = useState("");

  const [data, dataUpdate] = useState([]);
  const [singleClient, singleClientUpdate] = useState("");
  const [floorsList, floorsListUpdate] = useState([]);
  const [ahu, ahuUpdate] = useState([
    {
      id: Math.random(),
      name: "rf",
      AHUNumber: "df",
      CFM: "tgt",
      heightOfCoil: "gg",
      widthOfCoil: "ff",
      AHUMake: "ff",
      starterPanel: "ff",
      limitSwitch: "yes",
      UVhealCoilModel: "ddf",
      controllerId: "jj",
    },
  ]);
  const [controllerIdList, controllerIdListUpdate] = useState([]);

  const [lampAndDiData, lampAndDiDataUpdate] = useState([]);
  const [realTimeReportUrlData, realTimeReportUrlDataUpdate] = useState(
    "uploads/simreport255.html"
  );
  const [reportRefresh, reportRefreshUpdate] = useState(false);
  const [uvSensorValue, uvSensorValueUpdate] = useState("");
  const [duct, ductUpdate] = useState([
    {
      id: Math.random(),
      ductId: "dd",
      ductHeight: "gg",
      ductWidth: "tt",
      ductLength: "hh",
      ductMaterial: "h",
      CFM: "h",
      UVhealDuctModel: "h",
      controllerId: "jj",
    },
  ]);
  const [searchValue, searchValueUpdate] = useState("");

  useEffect(() => {
    isLoadingUpdate(true);
    const url = `${config.BASE_API_URL}admin/getAllClientList`;
    const data = {};
    const configs = {
      headers: { authorization: localStorage.getItem("token") },
    };
    Axios.post(url, data, configs)
      .then((res) => {
        isLoadingUpdate(false);
        if (res.data.code == 200) {
          dataUpdate(res.data.responseJson, "getAllClientList");
        }
      })
      .catch((error) => {
        isLoadingUpdate(false);
        console.log(error, "err");
      });
  }, []);

  useEffect(() => {
    // if (clientDetails) {
    isLoadingUpdate(true);
    const url = `${config.BASE_API_URL}admin/getSingleClientDetails`;
    const data = { clientId: clientDetails };
    const configs = {
      headers: { authorization: localStorage.getItem("token") },
    };
    // console.log('form submit', url, data, configs)
    Axios.post(url, data, configs)
      .then((res) => {
        isLoadingUpdate(false);
        if (res.data.code == 200 && res.data.responseJson) {
          singleClientUpdate(res.data.responseJson);
        }
        // console.log(res.data, "singleClientlist")
      })
      .catch((error) => {
        isLoadingUpdate(false);
        console.log(error.response, "err");
      });
    // }
  }, [clientDetails]);

  useEffect(() => {
    // if (clientAddress && buildingNo) {
    isLoadingUpdate(true);
    const url = `${config.BASE_API_URL}admin/getFloorListForBuildingNo`;
    const data = {
      clientId: clientDetails,
      addressId: clientAddress,
      buildingNo: buildingNo,
    };
    const configs = {
      headers: { authorization: localStorage.getItem("token") },
    };
    // console.log('form submit', url, data, configs)
    Axios.post(url, data, configs)
      .then((res) => {
        isLoadingUpdate(false);
        if (res.data.code == 200 && res.data.responseJson) {
          floorsListUpdate(res.data.responseJson);
        }
        // console.log(res.data, "floorsapi")
      })
      .catch((error) => {
        isLoadingUpdate(false);
        console.log(error.response, "err");
      });
    // }
  }, [buildingNo, clientAddress]);

  useEffect(() => {
    // if (floors) {
    isLoadingUpdate(true);
    const url = `${config.BASE_API_URL}admin/getAhuOrDuctList`;
    const data = {
      clientId: clientDetails,
      addressId: clientAddress,
      floorNo: floors.split("*")[0],
      type: floors.split("*")[1],
    };
    // const data = { clientId: clientDetails, addressId: clientAddress, floorNo: JSON.parse(floors)?.floorNo, type: JSON.parse(floors)?.type }
    const configs = {
      headers: { authorization: localStorage.getItem("token") },
    };
    // console.log('form submit', url, data, configs)
    Axios.post(url, data, configs)
      .then((res) => {
        isLoadingUpdate(false);
        if (res.data.code == 200) {
          if (res.data.responseJson.ahuDetails) {
            ahuUpdate(res.data.responseJson.ahuDetails);
          }
          // if (res.data.responseJson.duct) {
          //   ductUpdate(res.data.responseJson.ahuDetails)
          // }
        }
        // console.log(res.data, "floorsahuduct")
      })
      .catch((error) => {
        isLoadingUpdate(false);
        console.log(error, "errfloorsductahu");
      });
    // }
  }, [floors]);

  useEffect(() => {
    if (ahuSelected) {
      isLoadingUpdate(true);
      const url = `${config.BASE_API_URL}admin/getControllerIdsForAhu`;
      const data = {
        clientId: clientDetails,
        addressId: clientAddress,
        floorNo: floors.split("*")[0],
        type: floors.split("*")[1],
        AHUNumber: ahuSelected,
      };
      const configs = {
        headers: { authorization: localStorage.getItem("token") },
      };
      console.log("form submit", url, data, configs);
      Axios.post(url, data, configs)
        .then((res) => {
          isLoadingUpdate(false);
          console.log(res.data.responseJson, "json");
          if (res.data.code == 200 && res.data.responseJson) {
            controllerIdListUpdate(res.data.responseJson);
          }
        })
        .catch((error) => {
          isLoadingUpdate(false);
          console.log(error, "controllerlist");
        });
    }
  }, [ahuSelected]);

  // useEffect(() => {
  //   if (controllerIdSelected) {
  //     setInterval(() => {
  //       // console.log('timeout')
  //       // isLoadingUpdate(true)
  //       const url = `${config.BASE_API_URL}admin/getRealTimeReportUrlForControllerId`
  //       const data = {
  //         clientId: clientDetails, addressId: clientAddress,
  //         floorNo: floors.split('*')[0], type: floors.split('*')[1],
  //         AHUNumber: ahuSelected,
  //         controllerId: controllerIdSelected
  //       }
  //       const configs = { headers: { authorization: localStorage.getItem('token') } }
  //       // console.log('form submit', url, data, configs)
  //       Axios.post(url, data, configs)
  //         .then((res) => {
  //           // isLoadingUpdate(false)
  //           console.log(res.data.path, "path api")
  //           if (res?.data?.code == 200) {
  //             // reportRefreshUpdate(!reportRefresh)
  //             realTimeReportUrlDataUpdate('')
  //             realTimeReportUrlDataUpdate(res?.data?.path)
  //           }
  //         })
  //         .catch((error) => {
  //           // isLoadingUpdate(false)
  //           console.log(error, "err")
  //         })

  //     }, 25000)
  //   }
  // }, [controllerIdSelected])

  useEffect(() => {
    isLampLoadingUpdate(true);
    if (localStorage.getItem("token")) {
      setInterval(() => {
        const url2 = `${config.BASE_API_URL}admin/getLampAndDi`;
        const data2 = {
          controllerId: localStorage.getItem("controllerIdSelected"),
        };
        const configs2 = {
          headers: { authorization: localStorage.getItem("token") },
        };
        // console.log('form submit', url2, data2, configs2)
        Axios.post(url2, data2, configs2)
          .then((res) => {
            console.log(res, "resgetlamp");
            isLampLoadingUpdate(false);
            if (res.data.code == 200 && res.data?.responseJson) {
              // uvSensorValueUpdate(res.data.responseJson.uvSensorValue)
              lampAndDiDataUpdate(res.data?.responseJson.lamps);
            } else if (res.data.code == 200 && res.data?.responseJson == null) {
              lampAndDiDataUpdate([]);
            }
          })
          .catch((error) => {
            isLampLoadingUpdate(false);
            console.log(error, "err");
          });
      }, 25000);
    }
  }, [controllerIdSelected]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleResetLamp = (item) => {
    const url = `${config.BASE_API_URL}admin/resetTheLamps`;
    const data = {
      controllerId: controllerIdSelected,
      lampName: item.lampName,
    };
    const configs = {
      headers: { authorization: localStorage.getItem("token") },
    };
    // console.log('form submit', url, data, configs)
    Axios.post(url, data, configs)
      .then((res) => {
        toast(res?.data?.message);
      })
      .catch((error) => {
        console.log(error, "getrealtime");
      });
  };
  const handleSendCommandsOfLamps = (controllerId) => {
    const url = `${config.BASE_API_URL}admin/sendCommandsOfLamps`;
    const data = {
      controllerId: controllerId,
      switchOfLamps: !toggleButton,
    };
    const configs = {
      headers: { authorization: localStorage.getItem("token") },
    };
    // console.log('form submit', url, data, configs)
    Axios.post(url, data, configs)
      .then((res) => {
        isLoadingUpdate(false);
      })
      .catch((error) => {
        isLoadingUpdate(false);
        console.log(error, "getrealtime");
      });
  };
  return (
    <AdminLayout>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* className="d-flex" */}
        <div>
          <h3 className="text-center mb-2"> Admin Dashboard </h3>
        </div>
        <div>
          <input
            className="searchBar"
            placeholder="Search.."
            id="browser"
            name="browser"
            list="browsers"
            onChange={(e) => {
              clientDetailsUpdate(e.target.value);
            }}
          />
          <datalist id="browsers">
            {data.length > 0 &&
              data.map((item, index) => {
                return <option value={item?.clientId} />;
              })}
          </datalist>
        </div>
      </div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Row>
          {!isLoading && (
            <Col sm={3}>
              <Form.Control
                className="clientTableFormControl"
                placeholder="Client Details"
                name="clientDetails"
                value={clientDetails}
                onChange={(e) => {
                  clientDetailsUpdate(e.target.value);
                }}
                as="select"
                size="lg"
                custom
              >
                <option value={""}>Client Details</option>
                {data.length > 0 &&
                  data.map((client, index) => {
                    return (
                      <option key={index} value={client.clientId}>
                        {" "}
                        {client.clientId}{" "}
                      </option>
                    );
                  })}
              </Form.Control>
            </Col>
          )}

          {clientDetails && (
            <Col sm={3}>
              <Form.Control
                className="clientTableFormControl"
                placeholder="Client Address"
                name="clientAddress"
                value={clientAddress}
                onChange={(e) => {
                  clientAddressUpdate(e.target.value);
                }}
                as="select"
                size="lg"
                custom
              >
                <option value={""}>Client Address</option>
                {singleClient &&
                  singleClient?.addresses.length > 0 &&
                  singleClient.addresses.map((addressItem, index) => {
                    return (
                      <option key={index} value={addressItem.addressId}>
                        {addressItem.address}{" "}
                      </option>
                    );
                  })}
              </Form.Control>
            </Col>
          )}
          {clientDetails && clientAddress && (
            <Col sm={3}>
              <Form.Control
                className="clientTableFormControl"
                placeholder="Building no"
                name="buildingNo"
                value={buildingNo}
                onChange={(e) => {
                  buildingNoUpdate(e.target.value);
                }}
                as="select"
                size="lg"
                custom
              >
                <option value={""}>Building no</option>
                {singleClient.addresses.length > 0 &&
                  singleClient.addresses.map((addressItem, index) => {
                    return (
                      <option key={index} value={addressItem.buildingNo}>
                        {addressItem.buildingNo}{" "}
                      </option>
                    );
                  })}
              </Form.Control>
            </Col>
          )}
          {clientDetails && clientAddress && buildingNo && (
            <Col sm={3}>
              <Form.Control
                className="clientTableFormControl"
                placeholder="floors"
                name="floors"
                value={floors}
                onChange={(e) => {
                  floorsUpdate(e.target.value);
                }}
                as="select"
                size="lg"
                custom
              >
                <option value={""}>Floors</option>
                {floorsList.length > 0 &&
                  floorsList.map((floorItem, index) => {
                    // return <option value={JSON.stringify(floorItem)}> {floorItem.floorNo}  </option>
                    return (
                      <option
                        key={index}
                        value={`${floorItem.floorNo}*${floorItem.type}`}
                      >
                        {" "}
                        {floorItem.floorNo}{" "}
                      </option>
                    );
                  })}
              </Form.Control>
            </Col>
          )}
          {clientDetails &&
            clientAddress &&
            buildingNo &&
            floors &&
            ahu.length > 0 && (
              <Col sm={3}>
                <Form.Control
                  className="clientTableFormControl"
                  name="ahu"
                  value={ahuSelected}
                  onChange={(e) => {
                    ahuSelectedUpdate(e.target.value);
                  }}
                  as="select"
                  size="lg"
                  custom
                >
                  <option value={""}> AHU Number </option>
                  {ahu.length > 0 &&
                    ahu.map((ahuItem, index) => {
                      return (
                        <option key={index} value={ahuItem.AHUNumber}>
                          {" "}
                          {ahuItem.AHUNumber}{" "}
                        </option>
                      );
                    })}
                </Form.Control>
              </Col>
            )}
          {clientDetails &&
            clientAddress &&
            buildingNo &&
            floors &&
            ahuSelected && (
              <Col sm={3}>
                <Form.Control
                  className="clientTableFormControl"
                  name="ahu"
                  value={controllerIdSelected}
                  onChange={(e) => {
                    controllerIdSelectedUpdate(e.target.value);
                    localStorage.setItem(
                      "controllerIdSelected",
                      e.target.value
                    );
                  }}
                  as="select"
                  size="lg"
                  custom
                >
                  <option value={""}> Controller Id </option>
                  {controllerIdList.length > 0 &&
                    controllerIdList.map((controllerIdItem, index) => {
                      return (
                        <option key={index} value={controllerIdItem}>
                          {" "}
                          {controllerIdItem}{" "}
                        </option>
                      );
                    })}
                  {/* <Button size="sm" variant="primary"
                  onClick={() => { handleSendCommandsOfLamps(controllerIdSelected) }}> Switch Of Lamp </Button>  */}
                  {/* {
                  // console.log(controllerIdSelected);
                  
                }
                 */}
                </Form.Control>
                {
                  controllerIdSelected && (
                    <div>
                      <label style={{ marginLeft: "-261px" }}>
                        Controller switch
                      </label>{" "}
                      <Switch
                        onChange={() => {
                          setToggleButton(!toggleButton);
                          handleSendCommandsOfLamps(controllerIdSelected);
                        }}
                        checked={toggleButton}
                      />
                    </div>
                  )
                  //  <Button size="sm" variant="primary" style={{marginLeft:"110px"}}
                  //     onClick={() => { handleSendCommandsOfLamps(controllerIdSelected) }}> Switch Of controller </Button>
                }
              </Col>
            )}

          {clientDetails &&
            clientAddress &&
            buildingNo &&
            floors &&
            ahuSelected &&
            controllerIdSelected && (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th> Lamp Name </th>
                    <th> Status </th>
                    <th> Running Hours </th>
                    <th> Actions </th>
                  </tr>
                </thead>
                {isLampLoading && (
                  <div className="d-flex justify-content-center my-3">
                    <Spinner
                      className="d-block ml-auto"
                      role="status"
                      animation="border"
                    />
                  </div>
                )}

                {!isLampLoading && (
                  <tbody>
                    {lampAndDiData.length > 0 &&
                      lampAndDiData.map((item, index) => {
                        // console.log(item);
                        return (
                          <>
                            {item?.lampStatus == "on" &&
                              item?.runningHours != 0 && (
                                <tr key={index}>
                                  <td> {item?.lampName} </td>
                                  <td> {item?.lampStatus} </td>
                                  <td>
                                    {" "}
                                    {item.runningHours == 0
                                      ? 0
                                      : new Date(item.runningHours * 1000)
                                          .toISOString()
                                          .substr(11, 8)}{" "}
                                  </td>
                                  <td>
                                    {" "}
                                    <Button
                                      size="sm"
                                      variant="primary"
                                      onClick={() => {
                                        handleResetLamp(item);
                                      }}
                                    >
                                      {" "}
                                      Reset{" "}
                                    </Button>{" "}
                                  </td>
                                </tr>
                              )}
                          </>
                        );
                      })}
                  </tbody>
                )}
              </Table>
            )}

          {isLoading && (
            <Col sm={3}>
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status" />
              </div>
            </Col>
          )}
        </Row>
      </Form>
      {clientDetails &&
        clientAddress &&
        buildingNo &&
        floors &&
        ahuSelected &&
        controllerIdSelected &&
        realTimeReportUrlData &&
        reportRefresh == true && (
          <iframe
            width="100%"
            height="1000px"
            style={{ border: "none" }}
            src={`${config.BASE_API_URL}${realTimeReportUrlData}`}
            alt="report.html"
          />
        )}
      {clientDetails &&
        clientAddress &&
        buildingNo &&
        floors &&
        ahuSelected &&
        controllerIdSelected &&
        realTimeReportUrlData &&
        reportRefresh == false && (
          <iframe
            width="100%"
            height="1000px"
            style={{ border: "none" }}
            src={`${config.BASE_API_URL}${realTimeReportUrlData}`}
            alt="report.html"
          />
        )}
    </AdminLayout>
  );
};

export default AdminDashboard;
