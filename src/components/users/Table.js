import React from "react";
import { connect } from "react-redux";

const Table = (props) => {
    const makeTreads = () => (
        props.users.map((user) => (
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