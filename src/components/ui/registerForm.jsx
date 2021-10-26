import React, { useEffect, useState } from "react";

import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

const RegisterForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [professions, setProffesion] = useState();
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setTouched((prevState) => ({ ...prevState, [target.name]: 1 }));
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
    useEffect(() => {
        API.professions.fetchAll().then((data) => {
            setProffesion(data);
        });
        API.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
    }, []);

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        setData({ email: "", password: "", profession: "" });
        setTouched({});
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
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
                    touched={touched.email}
                    error={errors.email}
                />
                <TextField
                    type="password"
                    label="Пароль"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    touched={touched.password}
                    error={errors.password}
                />
                <SelectField
                    onChange={handleChange}
                    options={professions}
                    name="profession"
                    defaultOption="Choose..."
                    value={data.profession}
                    error={errors.profession}
                    label="Выберите вашу профессию"
                    touched={touched.profession}
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
                    options={qualities}
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
