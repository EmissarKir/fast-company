import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "lodash";
import { useParams } from "react-router-dom";

import CommentsList, { AddCommentForm } from "../common/comments";
import Loader from "../common/loader";

import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../../store/comments";
import { getCurrentUserId } from "../../store/users";

const Comments = () => {
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());

    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());

    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);

    const handleSubmit = (data) => {
        dispatch(createComment({ data, userId, currentUserId }));
    };
    const handleRemoveComment = (commentId) => {
        dispatch(removeComment(commentId));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
