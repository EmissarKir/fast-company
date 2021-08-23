import React, { useState } from "react";
import api from "../api";
import Table from "./table";
import { getNoun } from "../utils/index";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const renderPhrase = (userLength) => {
    let human = getNoun(userLength, "человек", "человека", "человек");
    let verb = getNoun(userLength, "тусанет", "тусанут", "тусанет");
    const str =
      userLength > 0 ? (
        <span className="badge bg-primary">
          {userLength} {human} {verb} с тобой сегодня
        </span>
      ) : (
        <span className="badge bg-danger">Никто с тобой не тусанет</span>
      );
    return str;
  };

  return (
    <div className="container-sm mt-2">
      {renderPhrase(users.length)}
      {users.length > 0 ? (
        <Table users={users} handleDelete={handleDelete} />
      ) : null}
    </div>
  );
};

export default Users;
