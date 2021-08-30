import React from "react";

const Bookmark = ({ isFavorites, userId, onToggleBookmark }) => {
  return (
    <button className="btn" onClick={() => onToggleBookmark(userId)}>
      {isFavorites && isFavorites ? (
        <i className="bi bi-bookmark-check-fill"></i>
      ) : (
        <i className="bi bi-bookmark"></i>
      )}
    </button>
  );
};

export default Bookmark;
