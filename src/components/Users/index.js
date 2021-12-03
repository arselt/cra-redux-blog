import React, { Component } from "react";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";

import { connect } from 'react-redux';

import * as usersActions from '../../actions/usersActions';
import Table from "./Table";

class Users extends Component {

  componentDidMount() {
    if (!this.props.users.length){
      this.props.bringAll();
    }
  }

  loadContent = () => {
    if (this.props.loading) {
      return <Spinner />;
    }

    if (this.props.error) {
      return <Fatal message={ this.props.error }/>;
    }

    return(
      <Table />
    )
  };

  render() {
    return(
      <div>
        <h1> Users </h1>
        { this.loadContent() }
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
}

export default connect(mapStateToProps, usersActions)(Users);