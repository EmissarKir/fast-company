import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setData({ email: "", password: "" });
        setTouched({});
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
    };

    return (
        <>
            <h1 className="mb-4">Login</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    type="text"
                    label="Электронная почта"
                    name="email"
                    handleChange={handleChange}
                    value={data.email}
                    touched={touched.email}
                    error={errors.email}
                />
                <TextField
                    type="password"
                    label="Пароль"
                    name="password"
                    handleChange={handleChange}
                    value={data.password}
                    touched={touched.password}
                    error={errors.password}
                />
                <CheckBoxField
                    value={data.stayOn}
                    name="stayOn"
                    onChange={handleChange}
                >
                    Оставаться в системе?
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

export default LoginForm;
