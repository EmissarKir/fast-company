import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import Loader from "../../common/loader";

import { validator } from "../../../utils/validator";
import { transformForReactSelect } from "../../../utils";

import {
    getQualities,
    getQualitiesLoadingStatus
} from "../../../store/qualities";
import {
    getProfessions,
    getProfessionsLoadingStatus
} from "../../../store/professions";
import { getCurrentUserData, updateUser } from "../../../store/users";

const UserEditPage = ({ userId }) => {
    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUserData());

    const professions = useSelector(getProfessions());
    const professionsLoading = useSelector(getProfessionsLoadingStatus());

    const qualities = useSelector(getQualities());
    const qualitiesLoading = useSelector(getQualitiesLoadingStatus());

    const qualitiesList = transformForReactSelect(qualities);
    const professionsList = transformForReactSelect(professions);

    const getQualitiesDefault = (array) => {
        return qualities
            .filter((item) => array.includes(item._id))
            .map((x) => ({ value: x._id, label: x.name }));
    };

    const initialState = {
        ...currentUser,
        qualities: getQualitiesDefault(currentUser.qualities)
    };
    const [data, setData] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isLoading, setLoading] = useState(true);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: "???????? <??????> ?????????????????????? ?????? ????????????????????"
            }
        },
        email: {
            isRequired: {
                message: "???????? <?????????????????????? ??????????>  ?????????????????????? ?????? ????????????????????"
            },
            isEmail: {
                message: "?????????????????????? ?????????? ???? ??????????????????"
            }
        },
        image: {
            isRequired: {
                message: "???????? <????????????> ?????????????????????? ?????? ????????????????????"
            }
        },
        qualities: {
            isRequired: {
                message: "???????? <????????????????> ?????????????????????? ?????? ????????????????????"
            }
        }
    };

    const validate = () => {
        if (!isLoading) {
            const errors = validator(data, validatorConfig);
            setErrors(errors);
            return Object.keys(errors).length === 0;
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    useEffect(() => {
        if (currentUser && !professionsLoading && !qualitiesLoading && !data) {
            setData(initialState);
            setLoading(false);
        }
    }, [professionsLoading, qualitiesLoading, currentUser, data]);

    useEffect(() => {
        if (data && isLoading) {
            setLoading(false);
        }
    }, [data]);

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const newData = {
            ...data,
            qualities: data.qualities.map((item) => item.value)
        };
        dispatch(updateUser(newData));
    };

    return (
        <div className="container mt-5">
            <div className="row position-relative">
                <Link to={`/users/${userId}`}>
                    <button className="position-absolute top-0 start-0 btn btn-primary btn-md">
                        <i className="bi bi-caret-left"></i> ??????????
                    </button>
                </Link>
                <div className="col-md-6 offset-md-3 shadow p-4 mt-sm-5">
                    {!isLoading ? (
                        <>
                            <h1 className="mb-4">Edit User</h1>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    type="text"
                                    label="??????"
                                    name="name"
                                    onChange={handleChange}
                                    value={data.name}
                                    error={errors.name}
                                />
                                <TextField
                                    type="text"
                                    label="?????????????????????? ??????????"
                                    name="email"
                                    onChange={handleChange}
                                    value={data.email}
                                    error={errors.email}
                                />
                                <TextField
                                    type="text"
                                    label="????????????"
                                    name="image"
                                    onChange={handleChange}
                                    value={data.image}
                                    error={errors.image}
                                />
                                <SelectField
                                    onChange={handleChange}
                                    options={professionsList}
                                    name="profession"
                                    defaultOption="Choose..."
                                    value={data.profession}
                                    error={errors.profession}
                                    label="???????????????? ???????? ??????????????????"
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    onChange={handleChange}
                                    label="???????????????? ?????? ??????"
                                    name="sex"
                                />
                                <MultiSelectField
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    label="???????????????? ???????? ????????????????"
                                    name="qualities"
                                />

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={!isValid}
                                >
                                    ??????????????????
                                </button>
                            </form>
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>
            </div>
        </div>
    );
};
UserEditPage.propTypes = {
    userId: PropTypes.string
};
export default UserEditPage;
