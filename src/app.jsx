import React, { useState } from "react";
import Users from "./components/users";
import api from "./api/index";
import Pagination from "./components/pagination";
import { createPages, createNumbers } from "./utils";
import SearchStatus from "./components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [pageNumber, setPageNumber] = useState(0);
  const maxScore = 5;
  // количество элементов на странице
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

  //  функция создает массив массивов с объектами, в зависимости от количества элементов на странице
  const data = createPages(users, pageSize);

  // функция создает массив номеров страниц
  const arrayPageNumbers = createNumbers(data.length);
  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <main>
        <SearchStatus length={users.length} />
        {users.length > 0 ? (
          <Users
            users={data[pageNumber]}
            onDelete={handleDelete}
            onToggleBookmark={handleToggleBookmark}
            maxScore={maxScore}
          />
        ) : null}
        {data.length > 1 ? (
          <Pagination
            arrayPageNumbers={arrayPageNumbers}
            onPageNumber={handlePageNumber}
            pageNumber={pageNumber}
          />
        ) : null}
      </main>
    </div>
  );
};

export default App;
