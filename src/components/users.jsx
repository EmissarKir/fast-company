import React, { useEffect, useState } from "react";

import Table from "./table";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import { paginate } from "./../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "./../api/index";

const Users = ({ users: allUsers, ...rest }) => {
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProffesion] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProffesion(data);
        });
    }, []);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setCurrentPage(1);
        setSelectedProf(item);
        console.log(item);
    };
    const clearFilter = () => {
        setSelectedProf();
    };

    const filtredUsers = selectedProf
        ? allUsers.filter((user) => user.profession.name === selectedProf.name)
        : allUsers;
    const count = filtredUsers.length;
    const users = paginate(filtredUsers, currentPage, pageSize);

    return (
        <div className="container-md mt-2">
            <div className="row">
                <div className="col-md-3">
                    {professions && (
                        <GroupList
                            items={professions}
                            selectItem={selectedProf}
                            onItemSelect={handleProfessionSelect}
                            clearFilter={clearFilter}
                        />
                    )}
                </div>

                <div className="col-md-9">
                    <SearchStatus length={count} />
                    {count > 0 ? <Table users={users} {...rest} /> : null}
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        onPageChange={handlePageChange}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>
    );
};
Users.propTypes = {
    users: PropTypes.array.isRequired
};
export default Users;
