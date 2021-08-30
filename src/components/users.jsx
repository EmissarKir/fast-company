import React, { useState } from "react";
import api from "../api";
import Table from "./table";
import SearchStatus from "./searchStatus";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  return (
    <div className="container-sm mt-2">
      <SearchStatus length={users.length} />
      {users.length > 0 ? (
        <Table users={users} handleDelete={handleDelete} />
      ) : null}
    </div>
  );
};

export default Users;
