import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ isFavorites, userId, onToggleBookmark }) => {
    const bookMarkFill = <i className="bi bi-bookmark-check-fill"></i>;
    const bookMarkEmpty = <i className="bi bi-bookmark"></i>;
    return (
        <button className="btn" onClick={() => onToggleBookmark(userId)}>
            {isFavorites ? bookMarkFill : bookMarkEmpty}
        </button>
    );
};
Bookmark.propTypes = {
    isFavorites: PropTypes.bool,
    userId: PropTypes.string.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};

export default Bookmark;
