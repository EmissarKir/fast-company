import React, { useState } from "react";
import Users from "./components/users";
import api from "./api/index";
import Pagination from "./components/pagination";

const createPages = (arr1, size) => {
  let pages = [];
  for (let i = 0; i < arr1.length; i += size) {
    let elem = arr1.slice(i, i + size);
    pages.push(elem);
  }
  return pages;
};

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [pageNumber, setPageNumber] = useState(0);
  const maxScore = 5;
  const pageSize = 4;

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggleBookmark = (userId) => {
    const newUsers = [...users];
    const indexObj = newUsers.findIndex((user) => user._id === userId);

    newUsers[indexObj].isFavorites = !newUsers[indexObj].isFavorites;
    setUsers(newUsers);
  };
  const handlePageNumber = (number) => {
    setPageNumber(number - 1);
  };

  const data = createPages(users, pageSize);

  const createNumbers = (length) => Array.from({ length }, (v, k) => k + 1);
  const arrayPageNumbers = createNumbers(data.length);
  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <main>
        <Users
          users={data[pageNumber]}
          onDelete={handleDelete}
          onToggleBookmark={handleToggleBookmark}
          maxScore={maxScore}
        />
        {data.length > 1 ? (
          <Pagination arr={arrayPageNumbers} onPageNumber={handlePageNumber} />
        ) : null}
      </main>
    </div>
  );
};

export default App;
