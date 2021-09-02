import React from "react";

const Pagination = ({ arr, onPageNumber }) => {
  return (
    <nav aria-label="...">
      <ul className="pagination">
        {arr.map((page) => (
          <li className="page-item" key={page}>
            <a
              className="page-link"
              href="#"
              onClick={() => onPageNumber(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
