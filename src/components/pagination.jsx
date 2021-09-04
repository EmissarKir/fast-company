import React from "react";

const Pagination = ({ arrayPageNumbers, onPageNumber, pageNumber }) => {
  const activePage = pageNumber + 1;
  return (
    <nav aria-label="...">
      <ul className="pagination">
        {arrayPageNumbers.map((page) => (
          <li
            className={"page-item " + (activePage === page ? "active" : null)}
            key={page}
          >
            <a className="page-link" onClick={() => onPageNumber(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
