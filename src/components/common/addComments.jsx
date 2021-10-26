import React from "react";
import PropTypes from "prop-types";
import SelectField from "./form/selectField";
import TextAreaField from "./form/textAreaField";

const AddComments = ({ users, onChange, onSubmit, newComment }) => {
    return (
        <form onSubmit={onSubmit}>
            <h2>New comment</h2>
            <SelectField
                onChange={onChange}
                options={users}
                name="userId"
                defaultOption="Выберите пользователя..."
                value={newComment.userId}
            />
            <TextAreaField
                label="Сообщение"
                rows="3"
                onChange={onChange}
                name="content"
                value={newComment.content}
            />
            <button type="submit" className="btn btn-primary">
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
    setData: PropTypes.func,
    userId: PropTypes.string
};
export default AddComments;
