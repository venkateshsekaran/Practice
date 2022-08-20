import React from "react";

const ReadOnlyRow = ({ entry, handleEditClick, handleDeleteClick, i }) => {
  return (
    <tr key={i + 1}>
      <td>{i + 1}</td>
      <td>{entry.name}</td>
      <td>{entry.role}</td>
      <td>{entry.age}</td>
      <td>
        <input
          type="submit"
          value="Edit"
          className="btn btn-warning mr-2"
          onClick={(event) => handleEditClick(event, entry)}
        />
        <input
          type="submit"
          value="Delete"
          className="btn btn-warning"
          onClick={() => handleDeleteClick(entry.id)}
        />
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
