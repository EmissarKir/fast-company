import React from "react";
import TableItem from "./tableItem";

const Table = ({ users, handleDelete }) => {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился, раз</th>
          <th scope="col">Оценка</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <TableItem user={user} handleDelete={handleDelete} key={index} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
