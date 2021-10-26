import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import TextField from "../../common/form/textField";
import { validator } from "../../../utils/validator";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import Loader from "../../loader";

/*
    //1. data.profession передается только _id, поэтому профессия не отображается в таблице
    //2. после редактирования юзера, некорректно отображаются qualities
    //3. не отображаются qualities в таблице
*/

const UserEditPage = ({ userId }) => {
    const history = useHistory();
    const [data, setData] = useState();

    // профессии - исользуются в SelectField
    const [professions, setProffesion] = useState();
    // качества
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
        name: {
            isRequired: {
                message: "Поле <Имя> обязательно для заполнения"
            }
        },
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Электронная почта не корректна"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    // загрузка данных пользователя
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setData(data);
        });
    }, []);
    // валидация полей пользователя
    useEffect(() => {
        // validate();
    }, [data]);

    // загрузка профессий и качеств
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProffesion(data);
        });
        api.qualities.fetchAll().then((data) => {
            setQualities(data);
        });
    }, []);

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        setData({
            name: "",
            email: "",
            profession: "",
            sex: "male",
            qualities: []
        });
        setTouched({});
        const isValid = validate();
        if (!isValid) return;

        // добавление объекта профессии в редактируемого пользователя
        // без этого приходит строка и профессия не отображается

        const newProfession =
            typeof data.profession !== "object"
                ? professions.find((item) => item._id === data.profession)
                : data.profession;
        // т.к. для отображения в react-select меняем _id/value и name/color
        // то, перед записью проверяем, если меняли, то откатываем обратно для
        // корректного отображения на других страницах
        const newQualities = data.qualities[0]._id
            ? data.qualities
            : data.qualities.map((item) => ({
                  _id: item.value,
                  name: item.label,
                  color: item.color
              }));

        api.users.update(userId, {
            ...data,
            profession: newProfession,
            qualities: newQualities
        });

        // перенаправление на страницу пользователя
        history.push(`/users/${userId}`);
    };

    if (data) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <h1 className="mb-4">Edit User Page</h1>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                type="text"
                                label="Имя"
                                name="name"
                                onChange={handleChange}
                                value={data.name}
                                touched={touched.name}
                                error={errors.name}
                            />
                            <TextField
                                type="text"
                                label="Электронная почта"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                touched={touched.email}
                                error={errors.email}
                            />
                            <SelectField
                                onChange={handleChange}
                                options={professions}
                                name="profession"
                                defaultOption="Choose..."
                                value={data.profession._id}
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

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                disabled={!isValid}
                            >
                                Отправить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return <Loader />;
};
UserEditPage.propTypes = {
    userId: PropTypes.string
};
export default UserEditPage;
