import React from "react";
import Qualitie from "./quality";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const TableItem = ({ user, onToggleBookmark, onDelete, maxScore }) => {
    return (
        <tr key={user._id}>
            <th>{user.name}</th>
            <td></td>
            {user.profession.name}
            <td>100</td>
            <td>{user.completedMeetings}</td>
            <td>
                {user.rate}/{maxScore}
            </td>
            <td></td>
            <td></td>
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
