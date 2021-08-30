import React from "react";

import Table from "./table";
import SearchStatus from "./searchStatus";

const Users = ({ users, ...rest }) => {
  return (
    <div className="container-sm mt-2">
      <SearchStatus length={users.length} />
      {users.length > 0 ? <Table users={users} {...rest} /> : null}
    </div>
  );
};

export default Users;
