import React from "react";

import Table from "./table";

const Users = ({ users, ...rest }) => {
  return (
    <div className="container-sm mt-2">
      <Table users={users} {...rest} />
    </div>
  );
};

export default Users;
