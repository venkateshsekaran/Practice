import React, { useState, useEffect, Fragment } from "react";
import EditableRow from "./components/EditableRow";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./components/ReadOnlyRow";
function App() {
  let [form, setForm] = useState({
    id: nanoid(),
    name: "",
    role: "",
    age: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    role: "",
    age: "",
  });

  let [entry, setEntry] = useState([]);
  let [EditEntryId, setEditEntryId] = useState(null);
  let [error, setError] = useState([]);
  let [issubmit, setissubmit] = useState(false);

  let handleEditClick = (event, entry) => {
    event.preventDefault();
    setEditEntryId(entry.id);

    const formValues = {
      name: entry.name,
      role: entry.role,
      age: entry.age,
    };

    setEditFormData(formValues);
  };

  const handleDeleteClick = (entryId) => {
    const newEntry = [...entry];

    const index = entry.findIndex((entry) => entry.id === entryId);

    newEntry.splice(index, 1);

    setEntry(newEntry);
  };

  let updateHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  let submitHandler = (event) => {
    event.preventDefault();
  };
  let addHandler = (event) => {
    setError(validate(form));
    if (Object.keys(error).length === 0) {
      setissubmit(true);
    }

    if (Object.keys(error).length === 0 && issubmit) {
      setEntry([...entry, form]);
      setForm({ ...form, id: nanoid(), name: "", role: "", age: "" });
    }
  };
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };
  const handleCancelClick = () => {
    setEditEntryId(null);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: EditEntryId,
      name: editFormData.name,
      role: editFormData.role,
      age: editFormData.age,
    };

    const newEntry = [...entry];

    const index = entry.findIndex((entry) => entry.id === EditEntryId);

    newEntry[index] = editedContact;

    setEntry(newEntry);
    setEditEntryId(null);
  };
  let [batsman, setBatsman] = useState([]);
  let [batFlag, setBatFlag] = useState(false);
  let [bowler, setBowler] = useState([]);
  let [bowlFlag, setBowlFlag] = useState(false);
  let [allrounder, setAllrounder] = useState([]);
  let [allrounderFlag, setAllrounderFlag] = useState(false);
  let [allflag, setAllFlag] = useState(false);
  let allHandler = () => {
    setBatFlag(false);
    setBowlFlag(false);
    setAllrounderFlag(false);
    setAllFlag(true);
  };
  let batsmanHandler = () => {
    let bat = entry.filter((data) => {
      setBatFlag(true);
      setBowlFlag(false);
      setAllrounderFlag(false);
      setAllFlag(false);
      return data.role.toLowerCase() == "batsman";
    });
    setBatsman(bat);
  };
  let bowlersHandler = () => {
    setBatFlag(false);
    setBowlFlag(true);
    setAllrounderFlag(false);
    setAllFlag(false);
    let bowl = entry.filter((data) => {
      return data.role.toLowerCase() == "bowler";
    });
    setBowler(bowl);
  };

  let allrounderHandler = () => {
    setBatFlag(false);
    setBowlFlag(false);
    setAllrounderFlag(true);
    setAllFlag(false);
    let allrounder = entry.filter((data) => {
      return data.role.toLowerCase() == "allrounder";
    });
    setAllrounder(allrounder);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && issubmit) {
      console.log(form);
      setEntry([...entry, form]);

      setForm({ ...form, id: nanoid(), name: "", role: "", age: "" });
      setissubmit(false);
    }
  }, [error]);

  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.role) {
      errors.role = "Role is required";
    }

    if (!values.age) {
      errors.age = " Age is required";
    } else if (values.age.length >= 3) {
      errors.age = "Please enter valid age";
    }

    return errors;
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row d-flex">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-header d-flex bg-info text-white">
                <h4 className="mx-auto ">Players</h4>
              </div>
              <div className="card-body">
                <form onSubmit={submitHandler}>
                  <div className="form-group">
                    <label className="font-weight-bold">Name:</label>
                    <input
                      type="text"
                      placeholder="Enter the name"
                      className="form-control"
                      name="name"
                      value={form.name}
                      onChange={updateHandler}
                      pattern="[a-zA-Z]+"
                    />
                  </div>
                  <p className="text-danger font-weight-bold">{error.name}</p>
                  <div className="form-group">
                    <label className="font-weight-bold">Role:</label>
                    <input
                      type="text"
                      placeholder="Enter the Role"
                      className="form-control"
                      name="role"
                      value={form.role}
                      onChange={updateHandler}
                    />
                  </div>
                  <p className="text-danger font-weight-bold">{error.role}</p>{" "}
                  <div className="form-group">
                    <label className="font-weight-bold">Age:</label>
                    <input
                      type="number"
                      placeholder="Enter the age"
                      className="form-control"
                      name="age"
                      value={form.age}
                      onChange={updateHandler}
                    />
                  </div>
                  <p className="text-danger font-weight-bold">{error.age}</p>
                  <div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-success"
                      onClick={addHandler}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {Object.keys(entry).length !== 0 ? (
        <div className="container mt-5">
          <div className="row d-flex">
            <div className="col-md-8 mx-auto">
              <form onSubmit={handleEditFormSubmit}>
                <table className="table table-hover">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Role</th>
                      <th>Age</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {(batFlag
                      ? batsman
                      : bowlFlag
                      ? bowler
                      : allrounderFlag
                      ? allrounder
                      : allflag
                      ? entry
                      : entry
                    ).map((entry, i) => {
                      return (
                        <Fragment>
                          {EditEntryId === entry.id ? (
                            <EditableRow
                              i={i}
                              editFormData={editFormData}
                              handleEditFormChange={handleEditFormChange}
                              handleCancelClick={handleCancelClick}
                            />
                          ) : (
                            <ReadOnlyRow
                              entry={entry}
                              handleEditClick={handleEditClick}
                              handleDeleteClick={handleDeleteClick}
                              i={i}
                            />
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p className="font-weight-bold d-flex text-align-center justify-content-center mt-5">
          No Players
        </p>
      )}

      {Object.keys(entry).length !== 0 ? (
        <div className="container mt-5 mb-5">
          <div className="row d-flex ">
            <div className="col-md-12  mx-auto">
              <input
                type="submit"
                className="btn btn-success mr-5 "
                value="Batsman"
                onClick={batsmanHandler}
              />
              <input
                type="submit"
                className="btn btn-success mr-5 "
                value="Bowlers"
                onClick={bowlersHandler}
              />
              <input
                type="submit"
                className="btn btn-success mr-5 "
                value="AllRounder"
                onClick={allrounderHandler}
              />
              <input
                type="submit"
                className="btn btn-success "
                value="All"
                onClick={allHandler}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
