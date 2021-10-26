import React from "react";
import { getNoun } from "../../utils/index";

const SearchStatus = ({ length }) => {
    const humanWord = getNoun(length, "человек", "человека", "человек");
    const verbWord = getNoun(length, "тусанет", "тусанут", "тусанет");
    const fullList = (
        <h3
            className="bg-primary text-center"
            style={{ color: "#ffffff", padding: "5px" }}
        >
            {length} {humanWord} {verbWord} с тобой сегодня
        </h3>
    );
    const emptyList = <h3 className="bg-danger">Никто с тобой не тусанет</h3>;
    const str = length > 0 ? fullList : emptyList;
    return str;
};

export default SearchStatus;
