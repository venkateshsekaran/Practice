import { useRef } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { FaSortAlphaUpAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ReactToPrint from "react-to-print";

const EditClientModal = (props) => {
  const refs = useRef();
  const { editViewToggle, editObj, editObjUpdate } = props;
  console.log(editObj, "editobj");
  const handleDownLoad = () => {
    html2canvas(refs.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("client.pdf");
    });
  };

  return (
    <Modal
      size="lg"
      show={props?.editShow}
      onHide={() => {
        props?.editSetShow(false);
      }}
    >
      <Modal.Header closeButton>
        <ReactToPrint
          trigger={() => <Button className="mr-2"> Print </Button>}
          content={() => refs.current}
        />
        {/* <Button className="mr-2" onClick={handleDownLoad}> Downlaod as pdf </Button> */}
      </Modal.Header>
      <Modal.Body ref={refs}>
        <Form onSubmit={() => props?.handleEdit()}>
          <Row>
            <Col sm={2}>
              <h6 className="mt-2"> Client ID </h6>
            </Col>
            <Col sm={4}>
              <Form.Control
                required
                disabled={true}
                className="clientTableFormControl"
                type="text"
                placeholder="Client ID"
                name="clientId"
                value={props?.editObj?.clientId}
                onChange={(e) => {
                  props?.handleChange(e);
                }}
              />
            </Col>
            <Col sm={2}>
              <h6 className="mt-2"> Client Name </h6>
            </Col>
            <Col sm={4}>
              <Form.Control
                required
                disabled={editViewToggle}
                className="clientTableFormControl"
                type="text"
                placeholder="Client Name"
                name="clientName"
                value={props?.editObj?.clientName}
                onChange={(e) => {
                  props?.handleChange(e);
                }}
              />
            </Col>
            <Col sm={2}>
              <h6 className="mt-2"> Client Email </h6>
            </Col>
            <Col sm={4}>
              <Form.Control
                required
                disabled={editViewToggle}
                className="clientTableFormControl"
                type="text"
                placeholder="Client Email"
                name="clientEmail"
                value={props?.editObj?.clientEmail}
                onChange={(e) => {
                  props?.handleChange(e);
                }}
              />
            </Col>
          </Row>

          {editObj?.addresses?.length > 0 &&
            editObj?.addresses?.map((addressItem, addressIndex) => {
              return (
                <Row
                  key={addressIndex}
                  style={{
                    border: "1px solid #eee",
                    margin: "10px",
                    padding: "10px 0",
                  }}
                >
                  <Col sm={2}>
                    <h6 className="mt-2"> Address </h6>
                  </Col>
                  <Col sm={4}>
                    <Form.Control
                      required
                      disabled={editViewToggle}
                      className="clientTableFormControl"
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={addressItem?.address}
                      onChange={(e) => {
                        props?.handleChange(e, addressItem);
                      }}
                    />
                  </Col>
                  <Col sm={2}>
                    <h6 className="mt-2"> Building No </h6>
                  </Col>
                  <Col sm={4}>
                    <Form.Control
                      required
                      disabled={editViewToggle}
                      className="clientTableFormControl"
                      type="text"
                      placeholder="Building No"
                      name="buildingNo"
                      value={addressItem?.buildingNo}
                      onChange={(e) => {
                        props?.handleChange(e, addressItem);
                      }}
                    />
                  </Col>

                  {addressItem?.floors?.length > 0 &&
                    addressItem?.floors?.map((floorItem, floorIndex) => {
                      return (
                        <Row key={floorIndex}>
                          <Col sm={3}></Col>
                          <Col sm={2}>
                            <h6 className="mt-2"> Floor No </h6>
                          </Col>
                          <Col sm={4}>
                            <Form.Control
                              required
                              disabled={editViewToggle}
                              className="clientTableFormControl"
                              type="text"
                              placeholder="Floor No"
                              name="floorNo"
                              value={floorItem?.floorNo?.floorNo}
                              onChange={(e) => {
                                props?.handleChange(e, addressItem, floorItem);
                              }}
                            />
                          </Col>
                          <Col sm={3}></Col>
                          {floorItem?.ahu?.length > 0 &&
                            floorItem?.ahu?.map((ahuItem, ahuIndex) => {
                              return (
                                <Row
                                  key={ahuIndex}
                                  style={{
                                    backgroundColor: "#eee",
                                    margin: "10px 0",
                                  }}
                                >
                                  <Col sm={12}>
                                    <h6 className="text-center mt-2 mb-3">
                                      {" "}
                                      AHU Details{" "}
                                    </h6>
                                  </Col>
                                  <Col sm={2}>
                                    <h6 className="mt-2"> Name </h6>
                                  </Col>
                                  <Col sm={4}>
                                    <Form.Control
                                      required
                                      disabled={editViewToggle}
                                      className="clientTableFormControl"
                                      type="text"
                                      placeholder="Name"
                                      name="name"
                                      value={ahuItem?.name}
                                      onChange={(e) => {
                                        props?.handleChange(
                                          e,
                                          addressItem,
                                          floorItem,
                                          ahuItem
                                        );
                                      }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <h6 className="mt-2"> AHUMake </h6>
                                  </Col>
                                  <Col sm={4}>
                                    <Form.Control
                                      required
                                      disabled={editViewToggle}
                                      className="clientTableFormControl"
                                      type="text"
                                      placeholder="AHU Make"
                                      name="AHUMake"
                                      value={ahuItem?.AHUMake}
                                      onChange={(e) => {
                                        props?.handleChange(
                                          e,
                                          addressItem,
                                          floorItem,
                                          ahuItem
                                        );
                                      }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <h6 className="mt-2"> CFM </h6>
                                  </Col>
                                  <Col sm={4}>
                                    <Form.Control
                                      required
                                      disabled={editViewToggle}
                                      className="clientTableFormControl"
                                      type="text"
                                      placeholder="CFM"
                                      name="CFM"
                                      value={ahuItem?.CFM}
                                      onChange={(e) => {
                                        props?.handleChange(
                                          e,
                                          addressItem,
                                          floorItem,
                                          ahuItem
                                        );
                                      }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <h6 className="mt-2">
                                      {" "}
                                      Starter Panel Type{" "}
                                    </h6>
                                  </Col>
                                  <Col sm={4}>
                                    <Form.Control
                                      disabled={editViewToggle}
                                      className="clientTableFormControl"
                                      type="text"
                                      placeholder="Starter Panel Type"
                                      name="starterPanel"
                                      value={ahuItem?.starterPanel}
                                      onChange={(e) => {
                                        props?.handleChange(
                                          e,
                                          addressItem,
                                          floorItem,
                                          ahuItem
                                        );
                                      }}
                                      as="select"
                                      custom
                                    >
                                      <option>Starter Panel Type</option>
                                      <option>Star Delta</option>
                                      <option>Delta</option>
                                      <option>VFD</option>
                                      <option>Other</option>
                                    </Form.Control>
                                  </Col>
                                  <Col sm={2}>
                                    <h6 className="mt-2"> AHU Number </h6>
                                  </Col>
                                  <Col sm={4}>
                                    <Form.Control
                                      disabled={editViewToggle}
                                      className="clientTableFormControl"
                                      type="text"
                                      placeholder="AHU Number"
                                      name="AHUNumber"
                                      value={ahuItem?.AHUNumber}
                                      onChange={(e) => {
                                        props?.handleChange(
                                          e,
                                          addressItem,
                                          floorItem,
                                          ahuItem
                                        );
                                      }}
                                    />
                                  </Col>
                                  <Col sm={2}>
                                    <h6 className="mt-2"> AHU Model </h6>
                                  </Col>
                                  <Col sm={4}>
                                    <Form.Control
                                      disabled={editViewToggle}
                                      className="clientTableFormControl"
                                      type="text"
                                      placeholder="AHU Model"
                                      name="ahuModel"
                                      value={ahuItem?.ahuModel}
                                      onChange={(e) => {
                                        props?.handleChange(
                                          e,
                                          addressItem,
                                          floorItem,
                                          ahuItem
                                        );
                                      }}
                                    />
                                  </Col>
                                  <Col sm={12}>
                                    <Row className="mb-2">
                                      <Col sm={4}>
                                        <span> Limit Switch : </span>
                                      </Col>
                                      <Col>
                                        <div
                                          onChange={(e) => {
                                            props?.handleChange(
                                              e,
                                              addressItem,
                                              floorItem,
                                              ahuItem
                                            );
                                          }}
                                        >
                                          <input
                                            disabled={editViewToggle}
                                            checked={
                                              ahuItem?.limitSwitch == "yes"
                                                ? "checked"
                                                : ""
                                            }
                                            type="radio"
                                            value="yes"
                                            name="limitSwitch"
                                          />{" "}
                                          Yes{" "}
                                          <input
                                            disabled={editViewToggle}
                                            checked={
                                              ahuItem?.limitSwitch == "no"
                                                ? "checked"
                                                : ""
                                            }
                                            type="radio"
                                            value="no"
                                            name="limitSwitch"
                                          />{" "}
                                          No{" "}
                                        </div>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col sm={12}>
                                    <Row className="mb-2">
                                      <Col sm={4}>
                                        <span> UV Heal System Type : </span>
                                      </Col>
                                      <Col>
                                        <div
                                          className="mb-2"
                                          onChange={(e) => {
                                            props?.handleChange(
                                              e,
                                              addressItem,
                                              floorItem,
                                              ahuItem
                                            );
                                          }}
                                        >
                                          <input
                                            disabled={editViewToggle}
                                            checked={
                                              ahuItem?.UVHealSystemType ==
                                              "coil"
                                                ? "checked"
                                                : ""
                                            }
                                            type="radio"
                                            value="coil"
                                            name="UVHealSystemType"
                                          />{" "}
                                          Coil{" "}
                                          <input
                                            disabled={editViewToggle}
                                            checked={
                                              ahuItem?.UVHealSystemType ==
                                              "duct"
                                                ? "checked"
                                                : ""
                                            }
                                            type="radio"
                                            value="duct"
                                            name="UVHealSystemType"
                                          />{" "}
                                          Duct{" "}
                                          <input
                                            disabled={editViewToggle}
                                            checked={
                                              ahuItem?.UVHealSystemType ==
                                              "both"
                                                ? "checked"
                                                : ""
                                            }
                                            type="radio"
                                            value="both"
                                            name="UVHealSystemType"
                                          />{" "}
                                          Both{" "}
                                        </div>
                                      </Col>
                                    </Row>
                                  </Col>

                                  {ahuItem?.uvHealSystemType === "coil" ||
                                    (ahuItem?.uvHealSystemType === "both" && (
                                      <Row
                                        style={{
                                          margin: "10px",
                                        }}
                                      >
                                        <Col sm={12}>
                                          <h6 className="text-center mt-2 mb-3">
                                            {" "}
                                            Coil Details{" "}
                                          </h6>
                                        </Col>
                                        <Col sm={2}>
                                          <h6 className="mt-2">
                                            {" "}
                                            Height Of Coil{" "}
                                          </h6>
                                        </Col>
                                        <Col sm={4}>
                                          <Form.Control
                                            required
                                            disabled={editViewToggle}
                                            className="clientTableFormControl"
                                            type="text"
                                            placeholder="Height Of Coil"
                                            name="heightOfCoil"
                                            value={ahuItem?.coil?.heightOfCoil}
                                            onChange={(e) => {
                                              props?.handleChange(
                                                e,
                                                addressItem,
                                                floorItem,
                                                ahuItem
                                              );
                                            }}
                                          />
                                        </Col>
                                        <Col sm={2}>
                                          <h6 className="mt-2">
                                            {" "}
                                            Width Of Coil{" "}
                                          </h6>
                                        </Col>
                                        <Col sm={4}>
                                          <Form.Control
                                            required
                                            disabled={editViewToggle}
                                            className="clientTableFormControl"
                                            type="text"
                                            placeholder="Width Of Coil"
                                            name="widthOfCoil"
                                            value={ahuItem?.coil?.widthOfCoil}
                                            onChange={(e) => {
                                              props?.handleChange(
                                                e,
                                                addressItem,
                                                floorItem,
                                                ahuItem
                                              );
                                            }}
                                          />
                                        </Col>
                                        <Col sm={2}>
                                          <h6 className="mt-2">
                                            {" "}
                                            UV Heal Coil Model{" "}
                                          </h6>
                                        </Col>
                                        <Col sm={4}>
                                          <Form.Control
                                            required
                                            disabled={editViewToggle}
                                            className="clientTableFormControl"
                                            type="text"
                                            placeholder="UV Heal Coil Model"
                                            name="UVHealCoilModel"
                                            value={
                                              ahuItem?.coil?.UVHealCoilModel
                                            }
                                            onChange={(e) => {
                                              props?.handleChange(
                                                e,
                                                addressItem,
                                                floorItem,
                                                ahuItem
                                              );
                                            }}
                                          />
                                        </Col>
                                        <Col sm={2}>
                                          <h6 className="mt-2">
                                            {" "}
                                            Controller Id{" "}
                                          </h6>
                                        </Col>
                                        <Col sm={4}>
                                          <Form.Control
                                            required
                                            disabled={editViewToggle}
                                            className="clientTableFormControl"
                                            type="text"
                                            placeholder="Controller Id"
                                            name="controllerId"
                                            value={ahuItem?.coil?.controllerId}
                                            onChange={(e) => {
                                              props?.handleChange(
                                                e,
                                                addressItem,
                                                floorItem,
                                                ahuItem
                                              );
                                            }}
                                          />
                                        </Col>
                                      </Row>
                                    ))}

                                  {
                                    // ahuItem?.uvHealSystemType == "duct" ||
                                    // ahuItem?.uvHealSystemType == "both" &&
                                    <Row
                                      style={{
                                        margin: "10px",
                                      }}
                                    >
                                      {ahuItem?.duct?.length > 0 &&
                                        ahuItem?.duct?.map(
                                          (ductItem, ductIndex) => {
                                            return (
                                              <>
                                                <Col key={ductIndex} sm={12}>
                                                  <h6 className="text-center mt-2">
                                                    {" "}
                                                    Duct Details{" "}
                                                  </h6>
                                                </Col>
                                                <Col sm={2}>
                                                  <h6 className="mt-2">
                                                    {" "}
                                                    CFM{" "}
                                                  </h6>
                                                </Col>
                                                <Col sm={4}>
                                                  <Form.Control
                                                    required
                                                    disabled={editViewToggle}
                                                    className="clientTableFormControl"
                                                    type="text"
                                                    placeholder="CFM"
                                                    name="CFM"
                                                    value={ductItem?.CFM}
                                                    onChange={(e) => {
                                                      props?.handleChange(
                                                        e,
                                                        addressItem,
                                                        floorItem,
                                                        ahuItem,
                                                        ductItem
                                                      );
                                                    }}
                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <h6 className="mt-2">
                                                    {" "}
                                                    UVHeal Duct Model{" "}
                                                  </h6>
                                                </Col>
                                                <Col sm={4}>
                                                  <Form.Control
                                                    required
                                                    disabled={editViewToggle}
                                                    className="clientTableFormControl"
                                                    type="text"
                                                    placeholder="UVHeal Duct Model"
                                                    name="UVHealDuctModel"
                                                    value={
                                                      ductItem?.UVHealDuctModel
                                                    }
                                                    onChange={(e) => {
                                                      props?.handleChange(
                                                        e,
                                                        addressItem,
                                                        floorItem,
                                                        ahuItem,
                                                        ductItem
                                                      );
                                                    }}
                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <h6 className="mt-2">
                                                    {" "}
                                                    Controller Id{" "}
                                                  </h6>
                                                </Col>
                                                <Col sm={4}>
                                                  <Form.Control
                                                    required
                                                    disabled={editViewToggle}
                                                    className="clientTableFormControl"
                                                    type="text"
                                                    placeholder="Controller Id"
                                                    name="controllerId"
                                                    value={
                                                      ductItem?.controllerId
                                                    }
                                                    onChange={(e) => {
                                                      props?.handleChange(
                                                        e,
                                                        addressItem,
                                                        floorItem,
                                                        ahuItem,
                                                        ductItem
                                                      );
                                                    }}
                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <h6 className="mt-2">
                                                    {" "}
                                                    Duct height{" "}
                                                  </h6>
                                                </Col>
                                                <Col sm={4}>
                                                  <Form.Control
                                                    required
                                                    disabled={editViewToggle}
                                                    className="clientTableFormControl"
                                                    type="text"
                                                    placeholder="Duct height"
                                                    name="ductHeight"
                                                    value={ductItem?.ductHeight}
                                                    onChange={(e) => {
                                                      props?.handleChange(
                                                        e,
                                                        addressItem,
                                                        floorItem,
                                                        ahuItem,
                                                        ductItem
                                                      );
                                                    }}
                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <h6 className="mt-2">
                                                    {" "}
                                                    Duct width{" "}
                                                  </h6>
                                                </Col>
                                                <Col sm={4}>
                                                  <Form.Control
                                                    required
                                                    disabled={editViewToggle}
                                                    className="clientTableFormControl"
                                                    type="text"
                                                    placeholder="Duct width"
                                                    name="ductWidth"
                                                    value={ductItem?.ductWidth}
                                                    onChange={(e) => {
                                                      props?.handleChange(
                                                        e,
                                                        addressItem,
                                                        floorItem,
                                                        ahuItem,
                                                        ductItem
                                                      );
                                                    }}
                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <h6 className="mt-2">
                                                    {" "}
                                                    Duct Length{" "}
                                                  </h6>
                                                </Col>
                                                <Col sm={4}>
                                                  <Form.Control
                                                    required
                                                    disabled={editViewToggle}
                                                    className="clientTableFormControl"
                                                    type="text"
                                                    placeholder="Duct Length"
                                                    name="ductLength"
                                                    value={ductItem?.ductLength}
                                                    onChange={(e) => {
                                                      props?.handleChange(
                                                        e,
                                                        addressItem,
                                                        floorItem,
                                                        ahuItem,
                                                        ductItem
                                                      );
                                                    }}
                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <h6 className="mt-2">
                                                    {" "}
                                                    Duct Material{" "}
                                                  </h6>
                                                </Col>
                                                <Col sm={4}>
                                                  <Form.Control
                                                    required
                                                    disabled={editViewToggle}
                                                    className="clientTableFormControl"
                                                    type="text"
                                                    placeholder="Duct Material"
                                                    name="ductMaterial"
                                                    value={
                                                      ductItem?.ductMaterial
                                                    }
                                                    onChange={(e) => {
                                                      props?.handleChange(
                                                        e,
                                                        addressItem,
                                                        floorItem,
                                                        ahuItem,
                                                        ductItem
                                                      );
                                                    }}
                                                  />
                                                </Col>
                                              </>
                                            );
                                          }
                                        )}
                                    </Row>
                                  }
                                  <Row>
                                    {!editViewToggle && (
                                      <Button
                                        className="ml-3 mt-2 mb-2"
                                        variant="primary"
                                        onClick={() => {
                                          const editedAddresses =
                                            editObj?.addresses?.map((i) => {
                                              if (i?.id == addressItem?.id) {
                                                const floorsArr =
                                                  i?.floors?.map((floor) => {
                                                    if (
                                                      floor?.id == floorItem?.id
                                                    ) {
                                                      const newAhu =
                                                        floor?.ahu.map(
                                                          (ahuItem2) => {
                                                            if (
                                                              ahuItem2.id ==
                                                              ahuItem?.id
                                                            ) {
                                                              const obj = {
                                                                id: Math.random(),
                                                                ductId: "",
                                                                isDuctConfirm: false,
                                                                ductHeight: "",
                                                                ductWidth: "",
                                                                ductLength: "",
                                                                ductMaterial:
                                                                  "",
                                                                CFM: "",
                                                                UVhealDuctModel:
                                                                  "",
                                                                controllerId:
                                                                  "",
                                                              };
                                                              const ductObj =
                                                                ahuItem?.duct;
                                                              const ductArr = [
                                                                ...ductObj,
                                                                obj,
                                                              ];
                                                              return {
                                                                ...ahuItem2,
                                                                duct: ductArr,
                                                              };
                                                            } else {
                                                              return ahuItem2;
                                                            }
                                                          }
                                                        );
                                                      return {
                                                        ...floor,
                                                        ahu: newAhu,
                                                      };
                                                    } else {
                                                      return floor;
                                                    }
                                                  });
                                                return {
                                                  ...i,
                                                  floors: floorsArr,
                                                };
                                              } else {
                                                return i;
                                              }
                                            });
                                          editObjUpdate({
                                            ...editObj,
                                            addresses: editedAddresses,
                                          });
                                        }}
                                      >
                                        {" "}
                                        Add More Duct Details +{" "}
                                      </Button>
                                    )}
                                  </Row>
                                </Row>
                              );
                            })}
                          <Row>
                            {!editViewToggle && (
                              <>
                                <Button
                                  className="ml-3 mt-2 mb-2"
                                  variant="primary"
                                  onClick={() => {
                                    const editedAddresses =
                                      editObj?.addresses?.map((i) => {
                                        if (i?.id == addressItem?.id) {
                                          const floorsArr = i?.floors?.map(
                                            (floor) => {
                                              if (floor?.id == floorItem?.id) {
                                                console.log(true, floor);
                                                const obj = {
                                                  id: Math.random(),
                                                  duct: [
                                                    {
                                                      id: Math.random(),
                                                      ductId: "",
                                                      ductHeight: "",
                                                      ductWidth: "",
                                                      ductLength: "",
                                                      ductMaterial: "",
                                                      CFM: "",
                                                      UVhealDuctModel: "",
                                                      controllerId: "",
                                                      isConfirm: false,
                                                    },
                                                  ],
                                                  UVHealSystemType: "",
                                                  name: "",
                                                  AHUNumber: "",
                                                  CFM: "",
                                                  heightOfCoil: "",
                                                  widthOfCoil: "",
                                                  AHUMake: "",
                                                  starterPanel: "",
                                                  limitSwitch: "",
                                                  UVhealCoilModel: "",
                                                  controllerId: "",
                                                  isDuctConfirm: false,
                                                };
                                                const ahuObj = floor?.ahu;
                                                const ahuArr = [...ahuObj, obj];
                                                return {
                                                  ...floor,
                                                  ahu: ahuArr,
                                                };
                                              } else {
                                                console.log(false, floor);
                                                return floor;
                                              }
                                            }
                                          );
                                          return { ...i, floors: floorsArr };
                                        } else {
                                          return i;
                                        }
                                      });
                                    editObjUpdate({
                                      ...editObj,
                                      addresses: editedAddresses,
                                    });
                                  }}
                                >
                                  {" "}
                                  Add More AHU Details +{" "}
                                </Button>{" "}
                              </>
                            )}
                          </Row>
                        </Row>
                      );
                    })}
                  <div className="addressCont w-100">
                    {!editViewToggle && (
                      <>
                        <Button
                          className="d-block"
                          variant="primary"
                          onClick={() => {
                            const editedAddresses = editObj?.addresses?.map(
                              (newFloor) => {
                                if (newFloor?.id == addressItem?.id) {
                                  const floorObj = {
                                    id: Math.random(),
                                    floorNo: "",
                                    ahu: [
                                      {
                                        id: Math.random(),
                                        UVHealSystemType: "",
                                        name: "",
                                        AHUNumber: "",
                                        CFM: "",
                                        heightOfCoil: "",
                                        widthOfCoil: "",
                                        AHUMake: "",
                                        starterPanel: "",
                                        limitSwitch: "",
                                        UVhealCoilModel: "",
                                        controllerId: "",
                                        duct: [
                                          {
                                            id: Math.random(),
                                            ductId: "",
                                            ductHeight: "",
                                            ductWidth: "",
                                            ductLength: "",
                                            ductMaterial: "",
                                            CFM: "",
                                            UVhealDuctModel: "",
                                            controllerId: "",
                                          },
                                        ],
                                      },
                                    ],
                                  };
                                  const arr = addressItem?.floors;
                                  const newFloorsArr = [...arr, floorObj];
                                  return { ...newFloor, floors: newFloorsArr };
                                } else {
                                  return newFloor;
                                }
                              }
                            );
                            editObjUpdate({
                              ...editObj,
                              addresses: editedAddresses,
                            });
                          }}
                        >
                          {" "}
                          Add Floor +{" "}
                        </Button>{" "}
                      </>
                    )}
                  </div>
                </Row>
              );
            })}
          <div className="addressCont">
            {!editViewToggle && (
              <>
                <Button
                  variant="primary"
                  onClick={() => {
                    const editedAddresses = [
                      ...editObj?.addresses,
                      {
                        id: Math.random(),
                        buildingNo: "",
                        address: "",
                        floors: [
                          {
                            id: Math.random(),
                            floorNo: "",
                            ahu: [
                              {
                                id: Math.random(),
                                UVHealSystemType: "",
                                name: "",
                                AHUNumber: "",
                                CFM: "",
                                heightOfCoil: "",
                                widthOfCoil: "",
                                AHUMake: "",
                                starterPanel: "",
                                limitSwitch: "",
                                UVhealCoilModel: "",
                                controllerId: "",
                                duct: [
                                  {
                                    id: Math.random(),
                                    ductId: "",
                                    ductHeight: "",
                                    ductWidth: "",
                                    ductLength: "",
                                    ductMaterial: "",
                                    CFM: "",
                                    UVhealDuctModel: "",
                                    controllerId: "",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ];

                    editObjUpdate({ ...editObj, addresses: editedAddresses });
                  }}
                >
                  {" "}
                  Add Address +{" "}
                </Button>{" "}
              </>
            )}
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {!editViewToggle && (
          <>
            <Button
              variant="primary"
              onClick={() => {
                props?.editSetShow(false);
              }}
            >
              Cancel{" "}
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                props?.handleEdit && props?.handleEdit();
              }}
            >
              {props?.isEditLoading ? "Editing.." : "Submit"}
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default EditClientModal;
