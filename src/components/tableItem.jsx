import React from "react";

const TableItem = ({ user, handleDelete }) => {
  let { qualities } = user;

  return (
    <tr key={user._id}>
      <th>{user.name}</th>
      <td>
        {qualities.map((item) => (
          <span key={item._id} className={"badge bg-" + item.color}>
            {item.name}
          </span>
        ))}
      </td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(user._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableItem;
