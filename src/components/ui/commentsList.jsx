import Comment from "./comment";
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
            {comments.length !== 0 ? (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {comments.map((comment) => (
                            <div key={comment._id}>
                                <Comment comment={comment} {...rest} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
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
