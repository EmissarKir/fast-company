import React from "react";
import { useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPasge";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            {edit ? (
                <UserEditPage userId={userId} />
            ) : userId ? (
                <UserPage userId={userId} />
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
