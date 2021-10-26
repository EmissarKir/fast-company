import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ isBookmark, userId, onToggleBookmark }) => {
    const bookMarkFill = <i className="bi bi-bookmark-check-fill"></i>;
    const bookMarkEmpty = <i className="bi bi-bookmark"></i>;
    return (
        <button className="btn" onClick={() => onToggleBookmark(userId)}>
            {isBookmark ? bookMarkFill : bookMarkEmpty}
        </button>
    );
};
Bookmark.propTypes = {
    isBookmark: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
