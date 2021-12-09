import React, { Component } from "react";
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";

import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";

import * as todosActions from '../../actions/todosActions';

class Add extends Component {

    componentDidMount() {
        const {
            match: { params: { user_id, todo_id } },
            todos,
            changeUserID,
            changeTitle,
            cleanForm
        } = this.props;

        if(user_id && todo_id) {
            const todo = todos[user_id][todo_id];
            changeUserID(todo.userId);
            changeTitle(todo.title);
        }
        else{
            cleanForm();
        }
    }

    changeUserID = (event) => {
        this.props.changeUserID(event.target.value)
    };

    changeTitle = (event) => {
        this.props.changeTitle(event.target.value)
    };

    save = () => {
        const {
            match: { params: { user_id, todo_id } },
            todos,
            // user_id,
            title,
            add,
            edit
        } = this.props;
        
        const new_todo = {
            userID: user_id,
            title: title,
            completed: false
        };

        if(user_id && todo_id) {
            const todo = todos[user_id][todo_id];
            const edited_todo = {
                ...new_todo,
                completed: todo.completed,
                id: todo.id
            };
            edit(edited_todo)
        }
        else {
            add(new_todo);
        }
    }

    disable = () => {
        const { user_id, title, loading } = this.props;

        if (loading) {
            return true;
        }

        if (!user_id || !title) {
            return true;
        }

        return false;
    }

    showAction = () => {
        const { error, loading } = this.props;

        if (loading) {
            return <Spinner />
        }

        if (error) {
            return <Fatal message={error} />
        }
    }

    render() {
        return(
            <div>
                {
                    (this.props.goback) ? <Redirect to='/todos' /> : ''
                }
                <h2>
                    Save Todo
                </h2>
                <label>
                    USER ID
                </label>
                <input
                    type='number'
                    defaultValue={ this.props.user_id }
                    onChange={ this.changeUserID }
                />
                <label> 
                    TITLE 
                </label>
                <input
                    value={ this.props.title }
                    onChange={ this.changeTitle}
                />
                <button
                    onClick={ this.save }
                    disabled={ this.disable() }
                >
                    Add Todo
                </button>
                { this.showAction() }
            </div>
        );
    }
}

const mapStateToProps = ({ todosReducer }) => todosReducer;

export default connect(mapStateToProps, todosActions)(Add);