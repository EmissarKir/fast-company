import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import UsersTable from "../../ui/usersTable";
import SearchStatus from "../../ui/searchStatus";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import api from "../../../api/index";
import Loader from "../../loader";
import SearchField from "../../common/form/searchField";
import { useUser } from "../../../hooks/useUsers";

const UsersListPage = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProffesion] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const { users } = useUser();
    const [searchValue, setSearchValue] = useState("");
    // const maxScore = 5;

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log("userId");
    };
    const handleToggleBookmark = (userId) => {
        const newUsers = [...users];
        const indexObj = newUsers.findIndex((user) => user._id === userId);
        newUsers[indexObj].bookmark = !newUsers[indexObj].bookmark;
        // setUsers(newUsers);
        console.log("newUsers", newUsers);
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProffesion(data);
        });
    }, []);

    useEffect(() => {
        setSelectedProf();
    }, [searchValue]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleProfessionSelect = (item) => {
        setCurrentPage(1);
        setSelectedProf(item);
        setSearchValue("");
    };
    const clearFilter = () => {
        setSelectedProf();
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearch = ({ target }) => {
        setSearchValue(target.value);
    };

    if (users) {
        const filtredUsers = selectedProf
            ? users.filter((user) => user.profession.name === selectedProf.name)
            : users;
        const count = filtredUsers.length;

        const sortedUsers = _.orderBy(
            filtredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const searchUsers = sortedUsers.filter((user) =>
            user.name.toLowerCase().includes(searchValue.toLowerCase().trim())
        );

        const usersCrop = paginate(searchUsers, currentPage, pageSize);

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
                        <SearchField
                            type="text"
                            name="search"
                            value={searchValue}
                            handleChange={handleSearch}
                            placeholder="Search..."
                        />
                        {count > 0 && (
                            <UsersTable
                                users={usersCrop}
                                onSort={handleSort}
                                selectedSort={sortBy}
                                onDelete={handleDelete}
                                onToggleBookmark={handleToggleBookmark}
                            />
                        )}
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
    }
    return <Loader />;
};

UsersListPage.propTypes = {
    users: PropTypes.array
};
export default UsersListPage;
