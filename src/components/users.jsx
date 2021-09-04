import React, { useState } from "react";

import Table from "./table";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "./../utils/paginate";
import PropTypes from "prop-types";
const Users = ({ users: allUsers, ...rest }) => {
    const count = allUsers.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const users = paginate(allUsers, currentPage, pageSize);
    return (
        <div className="container-sm mt-2">
            <SearchStatus length={allUsers.length} />
            {count > 0 ? <Table users={users} {...rest} /> : null}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired
};
export default Users;
