import React from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import UserEditPage from "../components/page/userEditPage";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";

import UsersLoader from "../components/ui/hoc/usersLoader";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUser = useSelector(getCurrentUserId());

    return (
        <UsersLoader>
            {userId ? (
                edit ? (
                    userId === currentUser ? (
                        <UserEditPage userId={userId} />
                    ) : (
                        <Redirect to={`/users/${currentUser}/edit`} />
                    )
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UsersLoader>
    );
};

export default Users;
