import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const TableItem = ({ user, onToggleBookmark, onDelete, maxScore }) => {
    return (
        <tr key={user._id}>
            <th>{user.name}</th>
            <td>
                <Qualitie qualities={user.qualities} />
            </td>
            {/* {user.profession.name} */}
            <td>100</td>
            <td>{user.completedMeetings}</td>
            <td>
                {user.rate}/{maxScore}
            </td>
            <td>
                <Bookmark
                    userId={user._id}
                    onToggleBookmark={onToggleBookmark}
                    isFavorites={user.isFavorites}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
TableItem.propTypes = {
    user: PropTypes.object.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    maxScore: PropTypes.number.isRequired
};
export default TableItem;
