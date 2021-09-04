import React from "react";
import { getNoun } from "../utils/index";

const SearchStatus = ({ length }) => {
    const humanWord = getNoun(length, "человек", "человека", "человек");
    const verbWord = getNoun(length, "тусанет", "тусанут", "тусанет");
    const fullList = (
        <span className="badge bg-primary">
            {length} {humanWord} {verbWord} с тобой сегодня
        </span>
    );
    const emptyList = (
        <span className="badge bg-danger">Никто с тобой не тусанет</span>
    );
    const str = length > 0 ? fullList : emptyList;
    return str;
};

export default SearchStatus;
