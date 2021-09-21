import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            <Quality qualities={qualities} />
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default QualitiesList;
