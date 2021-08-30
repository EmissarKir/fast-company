import React from "react";
import { getNoun } from "../utils/index";

const SearchStatus = ({ length }) => {
  let human = getNoun(length, "человек", "человека", "человек");
  let verb = getNoun(length, "тусанет", "тусанут", "тусанет");
  const str =
    length > 0 ? (
      <span className="badge bg-primary">
        {length} {human} {verb} с тобой сегодня
      </span>
    ) : (
      <span className="badge bg-danger">Никто с тобой не тусанет</span>
    );
  return str;
};

export default SearchStatus;
