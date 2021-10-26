import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../api";
import Loader from "../../loader";
import QualitiesList from "../../ui/quialities";
import CommentsList from "../../common/commentsList";

const UserPage = () => {
    // const history = useHistory();

    const params = useParams();
    const { userId } = params;
    // все пользователи. Используется в SelectField - AddComments
    const [users, setUsers] = useState();
    // текущий пользователь
    const [user, setUser] = useState();
    // отсортированные комментарии по userID
    const [comments, setComments] = useState();
    // новый комментарий
    const [newComment, setNewComment] = useState({
        userId: "",
        content: "",
        pageId: userId
    });

    // загрузка комментариев пользователя и сортировка по времени
    // повторная загрзка при добавлении нового комментария
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => {
            const newArray = data.sort((a, b) => b.created_at - a.created_at);
            setComments(newArray);
        });
    }, [newComment]);
    useEffect(() => {
        // все пользователи
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
        // текущий пользователь
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    const handleChange = (target) => {
        setNewComment((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // прекращаем поведение по умолчанию
    // добавляем новый комментарий в LocalStorage
    // при успешном добавлении, добавляем новый комментарий в комментарии пользователя (в state)
    const handleSubmit = (e) => {
        e.preventDefault();
        api.comments.add(newComment).then((dataUser) => {
            setComments((prevState) => [...prevState, dataUser]);
        });
        setNewComment({ userId: "", content: "", pageId: userId });
    };

    // получение (id комментария) из компонента Comment, удаление из LocalStorage
    // удаление из комментариев пользователя (из state)
    const handleClick = (id) => {
        api.comments.remove(id).then((data) => {
            const newComments = comments.filter((item) => item._id !== data);
            setComments(newComments);
        });
    };

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <Link to={`/users/${userId}/edit`}>
                                    <button className="position-absolute top-0 end-0 btn btn-light btn-sm">
                                        <i className="bi bi-gear"></i>
                                    </button>
                                </Link>

                                <div className="d-flex flex-column align-items-center text-center position-relative">
                                    <img
                                        src={`https://avatars.dicebear.com/api/avataaars/${user.name}.svg`}
                                        className="rounded-circle"
                                        width="150"
                                    />
                                    <div className="mt-3">
                                        <h4>{user.name}</h4>
                                        <p className="text-secondary mb-1">
                                            {user.profession.name}
                                        </p>
                                        <div className="text-muted">
                                            <i
                                                className="bi bi-caret-down-fill text-primary"
                                                role="button"
                                            ></i>
                                            <i
                                                className="bi bi-caret-up text-secondary"
                                                role="button"
                                            ></i>
                                            <span className="ms-2">
                                                {user.rate}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Qualities</span>
                                </h5>
                                <p className="card-text">
                                    {" "}
                                    {
                                        <QualitiesList
                                            qualities={user.qualities}
                                        />
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="card mb-3">
                            <div className="card-body d-flex flex-column justify-content-center text-center">
                                <h5 className="card-title">
                                    <span>Completed meetings</span>
                                </h5>

                                <h1 className="display-1">
                                    {user.completedMeetings}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {comments && (
                            <CommentsList
                                comments={comments}
                                users={users}
                                pageId={userId}
                                onClick={handleClick}
                                onChange={handleChange}
                                onSubmit={handleSubmit}
                                newComment={newComment}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
    return <Loader />;
};

export default UserPage;

/* <div className="container-md mt-5">
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
                <Link to={`/users/${userId}/edit`}>
                    <button className="btn btn-outline-danger me-3">
                        Редактировать
                    </button>
                </Link>

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
</div> */
