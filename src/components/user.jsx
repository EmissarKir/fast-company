import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import api from "../api";
import Loader from "./loader";
import QualitiesList from "./qualitiesList";

const User = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    const handleSave = () => {
        return history.push("/users");
    };

    if (user) {
        return (
            <div className="container-md mt-5">
                <div className="row">
                    <div className="col-md-12 d-flex justify-content-center">
                        <div className="card w-50 shadow-lg">
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item text-info">
                                    Профессия: {user.profession.name}
                                </li>
                                <li className="list-group-item">
                                    Встеритился: {user.completedMeetings} раз(а)
                                </li>
                                <li className="list-group-item">
                                    Качества:{" "}
                                    {
                                        <QualitiesList
                                            qualities={user.qualities}
                                        />
                                    }
                                </li>
                                <li className="list-group-item">
                                    Оценка: {user.rate}
                                </li>
                            </ul>
                            <div className="card-body">
                                <button
                                    onClick={handleSave}
                                    className="btn btn-outline-danger"
                                >
                                    Все пользователи
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <Loader />;
};

export default User;
