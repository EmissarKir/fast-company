import React from "react";

const Quality = ({ qualities }) => {
    const str = qualities.map((item) => (
        <span key={item._id} className={"badge bg-" + item.color}>
            {item.name}
        </span>
    ));
    return str;
};

export default Quality;
