import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Table = (props) => {
    const makeTreads = () => (
        props.users.map((user, key) => (
          <tr key={ user.id }>
            <td>
              { user.name }
            </td>
            <td>
              { user.email }
            </td>
            <td>
              { user.website }
            </td>
            <td>
              <Link to={`/entries/${key}`}>
                <div className="eye-solid icon"></div>
              </Link>
            </td>
          </tr>
        ))
    );

    return (
        <div>
            <table className="table">
            <thead>
                <tr>
                <th>
                    Nombre
                </th>
                <th>
                    Correo
                </th>
                <th>
                    Enlace
                </th>
                </tr>
            </thead>
            <tbody>
                { makeTreads() }
            </tbody>
            </table>
        </div>
    )
};

const mapStateToProps = (reducers) => {
    return reducers.usersReducer;
}

export default connect(mapStateToProps)(Table);