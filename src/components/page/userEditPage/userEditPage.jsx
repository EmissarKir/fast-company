import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import RadioField from "../../common/form/radioField";
import Loader from "../../common/loader";

import { validator } from "../../../utils/validator";
import { transformForReactSelect } from "../../../utils";

import { useProfessions } from "../../../hooks/useProfession";
import { useQualities } from "../../../hooks/useQualities";
import { useAuth } from "../../../hooks/useAuth";

const UserEditPage = ({ userId }) => {
    const history = useHistory();

    const { currentUser, updateCurrentUser } = useAuth();
    const { professions } = useProfessions();
    const { qualities } = useQualities();

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
                message: "Поле <Имя> обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Поле <Электронная почта>  обязательно для заполнения"
            },
            isEmail: {
                message: "Электронная почта не корректна"
            }
        },
        image: {
            isRequired: {
                message: "Поле <Аватар> обязательно для заполнения"
            }
        },
        qualities: {
            isRequired: {
                message: "Поле <Качество> обязательно для заполнения"
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
        setData(initialState);
    }, []);

    useEffect(() => {
        validate();
    }, [data]);

    useEffect(() => {
        if (data._id && professions.length > 0 && qualities.length > 0) {
            setLoading(false);
        }
    }, []);

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        const newData = {
            ...data,
            qualities: data.qualities.map((item) => item.value)
        };
        await updateCurrentUser(newData);
        history.push(`/users/${userId}`);
    };

    return (
        <div className="container mt-5">
            <div className="row position-relative">
                <Link to={`/users/${userId}`}>
                    <button className="position-absolute top-0 start-0 btn btn-primary btn-md">
                        <i className="bi bi-caret-left"></i> Назад
                    </button>
                </Link>
                <div className="col-md-6 offset-md-3 shadow p-4 mt-sm-5">
                    {!isLoading ? (
                        <>
                            <h1 className="mb-4">Edit User</h1>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    type="text"
                                    label="Имя"
                                    name="name"
                                    onChange={handleChange}
                                    value={data.name}
                                    error={errors.name}
                                />
                                <TextField
                                    type="text"
                                    label="Электронная почта"
                                    name="email"
                                    onChange={handleChange}
                                    value={data.email}
                                    error={errors.email}
                                />
                                <TextField
                                    type="text"
                                    label="Аватар"
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
                                    label="Выберите вашу профессию"
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={data.sex}
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                    name="sex"
                                />
                                <MultiSelectField
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    label="Выберите ваши качества"
                                    name="qualities"
                                />

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={!isValid}
                                >
                                    Отправить
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
