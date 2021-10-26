import React from "react";
import PropTypes from "prop-types";
import SelectField from "../common/form/selectField";
import TextAreaField from "../common/form/textAreaField";

const AddComments = ({
    users,
    onChange,
    onSubmit,
    newComment,
    errors,
    isValid
}) => {
    return (
        <form onSubmit={onSubmit}>
            <h2>New comment</h2>
            <SelectField
                onChange={onChange}
                options={users}
                name="userId"
                defaultOption="Выберите пользователя..."
                value={newComment.userId}
                error={errors.userId}
            />
            <TextAreaField
                label="Сообщение"
                rows="3"
                onChange={onChange}
                name="content"
                value={newComment.content}
                error={errors.content}
            />
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary float-end"
            >
                Опубликовать
            </button>
        </form>
    );
};

AddComments.propTypes = {
    pageId: PropTypes.string,
    users: PropTypes.array,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    newComment: PropTypes.object,
    errors: PropTypes.object,
    setData: PropTypes.func,
    userId: PropTypes.string,
    isValid: PropTypes.bool
};
export default AddComments;
