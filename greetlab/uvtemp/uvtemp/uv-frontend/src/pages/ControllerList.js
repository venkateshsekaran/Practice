import React, { useState, useEffect, useRef } from "react";
import { Table, Card, Button, Form, Spinner } from "react-bootstrap";
import AdminLayout from "../components/AdminLayout";
import Axios from "axios";
import config from "../config/config";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import EditControllerModal from "../components/EditControllerModal";
import SearchBar from "../components/SearchBar";
import handleDownload from "./commomFunction";
import ReactToPrint from "react-to-print";

const ControllerList = () => {
  const refs = useRef();
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [editShow, editSetShow] = useState(false);
  const [isLoading, isLoadingUpdate] = useState(false);
  const [isEditLoading, isEditLoadingUpdate] = useState(false);
  const [selectedId, selectedIdUpdate] = useState("");
  const [editObj, editObjUpdate] = useState({});
  const [isDeleteLoading, isDeleteLoadingUpdate] = useState(false);
  const [data, dataUpdate] = useState([
    {
      controllerId: "cid",
      connectedLamps: "clapm",
      uvSensor: "no",
      airSpeedSensor: "yes",
      di: [
        { diNo: "dino1", type: "none", description: "desc1" },
        { diNo: "dino1", type: "limitSwitch", description: "hh" },
      ],
    },
  ]);
  // const [data, dataUpdate] = useState([])
  const [editRefresh, editRefreshUpdate] = useState(false);
  const [deleteRefresh, deleteRefreshUpdate] = useState(false);
  const [searchValue, searchValueUpdate] = useState("");

  useEffect(() => {
    isLoadingUpdate(true);
    const url = `${config.BASE_API_URL}common/getController`;
    const data = {};
    const configs = {
      headers: { authorization: localStorage.getItem("token") },
    };
    console.log("form submit", url, data, configs);
    Axios.post(url, null, configs)
      .then((res) => {
        isLoadingUpdate(false);
        if (res.data.code == 200) {
          dataUpdate(res.data.responseData);
        }
        console.log(res.data, "controller list");
      })
      .catch((error) => {
        isLoadingUpdate(false);
        console.log(error, "err");
      });
  }, [editRefresh, deleteRefresh]);

  const handleEdit = (item) => {
    isEditLoadingUpdate(true);
    const url = `${config.BASE_API_URL}common/updateControllerList`;
    const data = { controller: editObj };
    const configs = {
      headers: { authorization: localStorage.getItem("token") },
    };
    console.log(url, data, configs);
    Axios.post(url, data, configs)
      .then((res) => {
        isEditLoadingUpdate(false);
        editSetShow(false);
        if (res.data?.code == 200) {
          editRefreshUpdate(!editRefresh);
          toast(res.data?.message);
        }
        console.log(res.data);
      })
      .catch((error) => {
        isEditLoadingUpdate(false);
        editSetShow(false);
        console.log(error, "err");
      });
  };

  const handleDelete = (item) => {
    isDeleteLoadingUpdate(true);
    const url = `${config.BASE_API_URL}common/deleteControllerList`;
    const data = { controllerId: item };
    const configs = {
      headers: { authorization: localStorage.getItem("token") },
    };
    Axios.post(url, data, configs)
      .then((res) => {
        isDeleteLoadingUpdate(false);
        setShow(false);
        if (res.data?.code == 200) {
          deleteRefreshUpdate(!deleteRefresh);
          toast(res.data?.message);
        }
        console.log(res.data);
      })
      .catch((error) => {
        isDeleteLoadingUpdate(false);
        setShow(false);
        console.log(error, "err");
      });
  };

  const handleChange = (e, p, index) => {
    if (
      e.target.name == "diNo" ||
      e.target.name == "type" ||
      e.target.name == "description"
    ) {
      const newDi = editObj.di.map((diItm, diIndex) => {
        if (index == diIndex) {
          return { ...diItm, [e.target.name]: e.target.value };
        } else {
          return diItm;
        }
      });
      editObjUpdate({ ...editObj, di: newDi });
    } else {
      editObjUpdate({ ...editObj, [e.target.name]: e.target.value });
    }
  };

  return (
    <AdminLayout>
      <div className="float-left">
        <h1>Controller Details</h1>
      </div>
      <div className="float-right">
        <ReactToPrint
          trigger={() => <Button className="mr-2"> Print </Button>}
          content={() => refs.current}
        />
        {/* <Button onClick={() => handleDownload({ html: "#table" })}>
          {" "}
          Download as pdf{" "}
        </Button> */}
        <SearchBar
          value={searchValue}
          onChange={(e) => {
            searchValueUpdate(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            history.push("/controller-table");
          }}
          variant="primary"
        >
          Add Controller Details{" "}
        </Button>
      </div>
      <div className="clear-both"></div>
      {isLoading && (
        <div className="mt-3 d-flex justify-content-center">
          <Spinner role="status" animation="border" />
        </div>
      )}
      {!isLoading && (
        <>
          <Table ref={refs} id="table" striped bordered hover>
            <thead>
              <tr>
                <th> Controller Id</th>
                <th> Connected Lamps </th>
                <th> UV Sensor Value </th>
                <th> Air Speed Sensor Value </th>
                <th> DI No </th>
                <th> DI Type </th>
                <th> DI Description </th>
                {/* <th> Mode </th> */}
                <th> Actions </th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item, index) => {
                  console.log(item);
                  return (
                    <tr key={index}>
                      <td> {item?.controllerId} </td>
                      <td> {item?.connectedLamps} </td>
                      <td> {item?.uvSensor == true ? "yes" : "no"} </td>
                      <td> {item?.airSpeedSensor == true ? "yes" : "no"} </td>
                      <td>
                        {" "}
                        {item?.di?.length > 0 &&
                          item?.di?.map((item) => {
                            return <p>{item?.diNo} </p>;
                          })}{" "}
                      </td>
                      <td>
                        {" "}
                        {item?.di?.length > 0 &&
                          item?.di?.map((item) => {
                            return <p> {item?.type}</p>;
                          })}{" "}
                      </td>
                      <td>
                        {" "}
                        {item?.di?.length > 0 &&
                          item?.di?.map((item) => {
                            return (
                              <p>{item?.type == "none" && item?.description}</p>
                            );
                          })}{" "}
                      </td>
                      <td>
                        {" "}
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => {
                            editSetShow(true);
                            editObjUpdate(item);
                          }}
                        >
                          {" "}
                          EDIT{" "}
                        </Button>{" "}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => {
                            setShow(true);
                            selectedIdUpdate(item.controllerId);
                          }}
                        >
                          {" "}
                          DELETE{" "}
                        </Button>{" "}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <DeleteModal
            show={show}
            setShow={(value) => setShow(value)}
            isDeleteLoading={isDeleteLoading}
            id={selectedId}
            handleDelete={(id) => handleDelete(id)}
          />
          <EditControllerModal
            editShow={editShow}
            editSetShow={(value) => editSetShow(value)}
            isEditLoading={isEditLoading}
            editObj={editObj}
            handleChange={(e, p, index) => handleChange(e, p, index)}
            handleEdit={(editObj) => handleEdit(editObj)}
          />
        </>
      )}
    </AdminLayout>
  );
};

export default ControllerList;
