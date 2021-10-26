import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, name, value, rows, onChange }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
                {label}
            </label>
            <textarea
                className="form-control"
                name={name}
                value={value}
                id="exampleFormControlTextarea1"
                onChange={handleChange}
                rows={rows}
            />
        </div>
    );
};
TextAreaField.propTypes = {
    label: PropTypes.string,
    rows: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.string
};

export default TextAreaField;
