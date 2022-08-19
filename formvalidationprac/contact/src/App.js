import React, { useState, useEffect, Fragment } from "react";
import EditableRow from "./components/EditableRow";
import { nanoid } from "nanoid";
import ReadOnlyRow from "./components/ReadOnlyRow";
function App() {
  let [form, setForm] = useState({
    id: nanoid(),
    name: "",
    email: "",
    number: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    number: "",
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
      email: entry.email,
      number: entry.number,
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
      setForm({ ...form, id: nanoid(), name: "", email: "", number: "" });
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
      email: editFormData.email,
      number: editFormData.number,
    };

    const newEntry = [...entry];

    const index = entry.findIndex((entry) => entry.id === EditEntryId);

    newEntry[index] = editedContact;

    setEntry(newEntry);
    setEditEntryId(null);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && issubmit) {
      console.log(form);
      setEntry([...entry, form]);

      setForm({ ...form, id: nanoid(), name: "", email: "", number: "" });
      setissubmit(false);
    }
  }, [error]);

  const validate = (values) => {
    const errors = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!values.name) {
      errors.name = "Name is required";
    }

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email";
    }

    if (!values.number) {
      errors.number = " Mobile Number is required";
    } else if (values.number.length < 10 || values.number.length > 10) {
      errors.number = "Please enter valid 10 digit mobile number";
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
                <h4 className="mx-auto ">Contact App</h4>
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
                    <label className="font-weight-bold">Email:</label>
                    <input
                      type="email"
                      placeholder="Enter the email"
                      className="form-control"
                      name="email"
                      value={form.email}
                      onChange={updateHandler}
                    />
                  </div>
                  <p className="text-danger font-weight-bold">{error.email}</p>{" "}
                  <div className="form-group">
                    <label className="font-weight-bold">Mobile No:</label>
                    <input
                      type="number"
                      placeholder="Enter the number"
                      className="form-control"
                      name="number"
                      value={form.number}
                      onChange={updateHandler}
                    />
                  </div>
                  {form.number.length === 10 ? (
                    <p className="text-success font-weight-bold">Strong</p>
                  ) : (
                    <p className="text-danger font-weight-bold">
                      {error.number}
                    </p>
                  )}
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
                      <th>Email</th>
                      <th>Mobile No</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {entry.map((entry, i) => {
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
          No Contacts
        </p>
      )}
    </div>
  );
}

export default App;
