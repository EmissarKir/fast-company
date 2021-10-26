import Comment from "../common/comment";
import React from "react";
import PropTypes from "prop-types";
import AddComments from "./addComments";

const CommentsList = ({ comments, ...rest }) => {
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddComments {...rest} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {comments &&
                        comments.map((comment) => (
                            <div key={comment._id}>
                                <Comment comment={comment} {...rest} />
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};
CommentsList.propTypes = {
    comments: PropTypes.array,
    setComments: PropTypes.func,
    sortedArray: PropTypes.func,
    userId: PropTypes.string
};
export default CommentsList;
