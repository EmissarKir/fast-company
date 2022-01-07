import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { getQualities } from "../../store/qualities";
import { getProfessions } from "../../store/professions";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        name: "",
        qualities: [],
        licence: false
    });
    const { signUp } = useAuth();

    const professions = useSelector(getProfessions());
    const qualities = useSelector(getQualities());

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта не корректна"
            }
        },
        name: {
            isRequired: {
                message: "Имя обязательно для заполнения"
            },
            min: {
                message: "Имя должно состоять минимум из 3 символов",
                value: 3
            }
        },
        password: {
            isRequired: {
                message: "Пароль обязателен для заполнения"
            },
            isCapital: {
                message: "Пароль должен иметь одну заглавную букву"
            },
            isDigit: {
                message: "Пароль должен иметь одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    useEffect(() => {
        validate();
    }, [data]);

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };
        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <>
            <h1 className="mb-4">Register</h1>
            <form onSubmit={handleSubmit}>
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
                    label="Имя"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                    error={errors.name}
                />
                <TextField
                    type="password"
                    label="Пароль"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    error={errors.password}
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
                <CheckBoxField
                    value={data.licence}
                    name="licence"
                    onChange={handleChange}
                    error={errors.licence}
                >
                    Подтвердить <a>лицензионное соглашение</a>
                </CheckBoxField>

                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={!isValid}
                >
                    Отправить
                </button>
            </form>
        </>
    );
};

export default RegisterForm;
