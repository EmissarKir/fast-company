import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import qualityService from "../services/quality.service";
import { arrayMatch } from "../utils";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualitiesList();
    }, []);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }
    // Array
    // [
    //     "618e5b58e0f168d0ffbd7265",
    //     "618e5b58e0f168d0ffbd726b"
    // ]
    // qualities
    // [
    //     {
    //         "_id": "618e5b58e0f168d0ffbd7263",
    //         "name": "Нудила",
    //         "color": "primary",
    //         "createdAt": "2021-11-12T12:17:28.794Z",
    //         "updatedAt": "2021-11-12T12:17:28.794Z",
    //         "__v": 0
    //     },
    //     {
    //         "_id": "618e5b58e0f168d0ffbd7265",
    //         "name": "Странный",
    //         "color": "secondary",
    //         "createdAt": "2021-11-12T12:17:28.795Z",
    //         "updatedAt": "2021-11-12T12:17:28.795Z",
    //         "__v": 0
    //     },
    // ]

    function getQualities(array) {
        const userQualities = arrayMatch(array, qualities);
        return userQualities;
    }
    async function getQualitiesList() {
        try {
            const { content } = await qualityService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <QualitiesContext.Provider
            value={{ qualities, isLoading, getQualities }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
