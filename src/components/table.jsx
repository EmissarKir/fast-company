import React from "react";
import TableItem from "./tableItem";
import PropTypes from "prop-types";

const Table = ({ users, ...rest }) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <TableItem user={user} {...rest} key={index} />
                ))}
            </tbody>
        </table>
    );
};
Table.propTypes = {
    users: PropTypes.array.isRequired
};

export default Table;
