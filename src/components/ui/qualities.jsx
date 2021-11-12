import React from "react";

import { useQualities } from "../../hooks/useQualities";
import PropTypes from "prop-types";
import QualitiesList from "./quialities";

const Qualities = ({ array }) => {
    const { getQualities, isLoading } = useQualities();
    const userQualities = getQualities(array);
    if (!isLoading) {
        return <QualitiesList qualities={userQualities} />;
    } else return <p>Loading...</p>;
};
Qualities.propTypes = {
    array: PropTypes.array
};

export default Qualities;
