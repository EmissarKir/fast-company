import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultiSelectField = ({ label, options, onChange, name, defaultValue }) => {
    const handleChange = (value) => {
        onChange({ name: name, value });
    };

    // преобразование
    const modifedDefault = defaultValue.map((item) => ({
        value: item._id,
        label: item.name,
        color: item.color
    }));

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  value: options[optionName]._id,
                  label: options[optionName].name,
                  color: options[optionName].color
              }))
            : options;
    console.log("defaultValue", defaultValue);
    console.log("modifedDefault", modifedDefault);

    return (
        <div className="mb-4">
            <label htmlFor="validationCustom04" className="form-label">
                {label}
            </label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                defaultValue={modifedDefault}
                name={name}
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
