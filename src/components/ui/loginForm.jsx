import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router";

const LoginForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const { logIn } = useAuth();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await logIn(data);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    return (
        <>
            <h1 className="mb-4">Login</h1>
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
                    type="password"
                    label="Пароль"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
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
