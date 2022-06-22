import React from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

const EditControllerModal = (props) => {
  return (
    <Modal
      size="lg"
      show={props?.editShow}
      onHide={() => {
        props?.editSetShow(false);
      }}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Form onSubmit={() => props?.handleEdit()}>
          <Row>
            <Col sm={2}>
              <h6 className="mt-2"> Controller ID </h6>
            </Col>
            <Col sm={4}>
              <Form.Control
                required
                className="clientTableFormControl"
                type="text"
                placeholder="Controller ID"
                name="controllerId"
                value={props?.editObj?.controllerId}
                onChange={(e) => {
                  props?.handleChange(e);
                }}
              />
            </Col>
            <Col sm={2}>
              <h6 className="mt-2"> Connected Lamps </h6>
            </Col>
            <Col sm={4}>
              <Form.Control
                required
                className="clientTableFormControl"
                type="text"
                placeholder="Connected Lamps"
                name="connectedLamps"
                value={props?.editObj?.connectedLamps}
                onChange={(e) => {
                  props?.handleChange(e);
                }}
              />
            </Col>

            <Col sm={2}>
              <h6 className="mt-2"> UV Sensor </h6>
            </Col>
            <Col sm={4}>
              <Form.Control
                required
                className="clientTableFormControl"
                as="select"
                custom
                name="uvSensor"
                value={props?.editObj?.uvSensor}
                onChange={(e) => {
                  props?.handleChange(e);
                }}
              >
                {/* <option value={''}> UV Sensor </option> */}
                <option value={"yes"}> Yes </option>
                <option value={"no"}> No </option>
              </Form.Control>
            </Col>
            <Col sm={2}>
              <h6 className="mt-2"> Air speed sensor</h6>
            </Col>
            <Col sm={4}>
              <Form.Control
                required
                className="clientTableFormControl"
                as="select"
                custom
                name="airSpeedSensor"
                value={props?.editObj?.airSpeedSensor}
                onChange={(e) => {
                  props?.handleChange(e);
                }}
              >
                {/* <option value={''}> Air speed Sensor </option> */}
                <option value={"yes"}> Yes </option>
                <option value={"no"}> No </option>
              </Form.Control>
            </Col>
          </Row>

          <h6 className="mt-2 text-center mb-3"> DI </h6>

          {props?.editObj?.di?.length > 0 &&
            props?.editObj?.di.map((p, index) => {
              return (
                <Row>
                  <Col sm={2}>
                    <h6 className="mt-2"> DI No </h6>
                  </Col>
                  <Col sm={4}>
                    <Form.Control
                      required
                      className="clientTableFormControl"
                      type="text"
                      placeholder="DI"
                      name="diNo"
                      value={p.diNo}
                      onChange={(e) => {
                        props?.handleChange(e, p, index);
                      }}
                    />
                  </Col>
                  <Col sm={2}>
                    <h6 className="mt-2"> DI Type </h6>
                  </Col>
                  <Col sm={4}>
                    <Form.Control
                      required
                      className="clientTableFormControl"
                      as="select"
                      custom
                      name="type"
                      value={p.type}
                      onChange={(e) => {
                        props?.handleChange(e, p, index);
                      }}
                    >
                      <option value={""}> Type </option>
                      <option value={"accessControl"}> Access Control </option>
                      <option value={"limitSwitch"}> Limit Switch </option>
                      <option value={"none"}> None </option>
                    </Form.Control>
                  </Col>
                  {p.type == "none" && (
                    <>
                      <Col sm={2}>
                        <h6 className="mt-2"> Description </h6>
                      </Col>
                      <Col sm={4}>
                        <Form.Control
                          required
                          className="clientTableFormControl"
                          type="text"
                          name="description"
                          placeholder="Description"
                          value={p?.description}
                          onChange={(e) => props?.handleChange(e, p, index)}
                        />
                      </Col>
                    </>
                  )}
                </Row>
              );
            })}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            props?.editSetShow(false);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            props?.handleEdit();
          }}
        >
          {props?.isEditLoading ? "Editing.." : "Submit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditControllerModal;
