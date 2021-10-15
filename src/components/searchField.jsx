import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ type, name, value, placeholder, handleChange }) => {
    return (
        <div className="mb-4">
            <div>
                <input
                    type={type}
                    className="form-control"
                    onChange={handleChange}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
};

SearchField.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func
};

export default SearchField;
