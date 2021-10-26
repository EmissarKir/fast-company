import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectItem,
    clearFilter
}) => {
    const isArray = Array.isArray(items);

    const adoptedObject = () => {
        return Object.keys(items).map((item) => (
            <li
                key={items[item][valueProperty]}
                className={
                    "list-group-item" +
                    (selectItem === items[item] ? " active" : "")
                }
                role="button"
                onClick={() => {
                    onItemSelect(items[item]);
                }}
            >
                {items[item][contentProperty]}
            </li>
        ));
    };

    const adoptedArray = () => {
        return items.map((item) => (
            <li
                key={item[valueProperty]}
                className={
                    "list-group-item" + (selectItem === item ? " active" : "")
                }
                role="button"
                onClick={() => {
                    onItemSelect(item);
                }}
            >
                {item[contentProperty]}
            </li>
        ));
    };
    return (
        <ul className="list-group">
            {isArray ? adoptedArray() : adoptedObject()}
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
                Сбросить
            </button>
        </ul>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    selectItem: PropTypes.object,
    clearFilter: PropTypes.func
};
export default GroupList;
