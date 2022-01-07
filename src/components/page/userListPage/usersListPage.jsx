import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { useSelector } from "react-redux";

import UsersTable from "../../ui/usersTable";
import SearchStatus from "../../ui/searchStatus";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import Loader from "../../common/loader";
import SearchField from "../../common/form/searchField";

import { paginate } from "../../../utils/paginate";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const users = useSelector(getUsersList());

    const currentUser = useSelector(getCurrentUserId());
    const [currentPage, setCurrentPage] = useState(1);

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

    const [searchValue, setSearchValue] = useState("");
    const pageSize = 8;
    // const maxScore = 5;

    const handleToggleBookmark = (userId) => {
        const newUsers = [...users];
        const indexObj = newUsers.findIndex((user) => user._id === userId);
        newUsers[indexObj].bookmark = !newUsers[indexObj].bookmark;
        // setUsers(newUsers);
    };

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
        function filterUsers(data) {
            const filterData = searchValue
                ? data.filter(
                      (user) =>
                          user.name
                              .toLowerCase()
                              .indexOf(searchValue.toLowerCase()) !== -1
                  )
                : selectedProf
                ? data.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : data;
            return filterData.filter((item) => item._id !== currentUser);
        }
        const filteredUsers = filterUsers(users);
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        return (
            <div className="container-md mt-2">
                <div className="row">
                    <div className="col-md-3">
                        {!professionsLoading && (
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
