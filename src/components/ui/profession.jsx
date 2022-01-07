import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus
} from "../../store/profession";

const Profession = ({ id }) => {
    const { name: profName } = useSelector(getProfessionById(id));
    const professionLoading = useSelector(getProfessionsLoadingStatus());

    if (!professionLoading) {
        return <p> {profName}</p>;
    }
    return <p> Loading...</p>;
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
