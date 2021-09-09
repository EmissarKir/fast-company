import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api/index";

const App = () => {
    const [users, setUsers] = useState();
    const maxScore = 5;

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookmark = (userId) => {
        const newUsers = [...users];
        const indexObj = newUsers.findIndex((user) => user._id === userId);
        newUsers[indexObj].isFavorites = !newUsers[indexObj].isFavorites;
        setUsers(newUsers);
    };
    return (
        <div className="col-lg-8 mx-auto p-3 py-md-5">
            <main>
                {users && (
                    <Users
                        users={users}
                        onDelete={handleDelete}
                        onToggleBookmark={handleToggleBookmark}
                        maxScore={maxScore}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
