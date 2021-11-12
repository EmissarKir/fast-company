import React from "react";
import { useParams } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage";
import UsersListPage from "../components/page/userListPage";
import UserPage from "../components/page/userPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;

    return (
        <>
            <UserProvider>
                {edit ? (
                    <UserEditPage userId={userId} />
                ) : userId ? (
                    <UserPage userId={userId} />
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
