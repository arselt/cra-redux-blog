import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

import * as todosActions from '../../actions/todosActions'

class Todos extends Component {
    componentDidMount() {
        if (!Object.keys(this.props.todos).length) {
            this.props.bringTodos();
        }
    }

    componentDidUpdate() {
        const { todos, loading, bringTodos } = this.props;

        if (!Object.keys(todos).length && !loading) {
            bringTodos();
        }
    }

    showContent = () => {
        const { todos, loading, error } = this.props;

        if (loading) {
            return <Spinner />
        }

        if (error) {
            return <Fatal message={error} />
        }

        return Object.keys(todos).map((user_id) => (
            <div key={user_id}>
                <h2>
                    User: {user_id}
                </h2>
                <div className='todos_container'>
                    { this.placeTodos(user_id)}
                </div>
            </div>
        ))
    };

    placeTodos = (user_id) => {
        const { todos, changeCheck, deleteTodo } = this.props;
        const by_user = {
            ...todos[user_id]
        };

        return Object.keys(by_user).map((todo_id) => (
            <div key={todo_id}>
                <input 
                    type='checkbox'
                    defaultChecked={by_user[todo_id].completed}
                    onChange={ () => changeCheck(user_id, todo_id) }
                />
                {
                    by_user[todo_id].title
                }
                <Link to={`/todos/add/${user_id}/${todo_id}`}>
                    <button>
                        Edit
                    </button>
                </Link>
                <button onClick={ () => deleteTodo(todo_id) }>
                    Delete
                </button>
            </div>
        ));
    }

    render() {
        return(
            <div>
                <Link to='todos/add'>
                    <button>
                        Add
                    </button>
                </Link>
                { this.showContent() }
            </div>
        );
    }
}

const mapStateToProps = ({ todosReducer }) => todosReducer;

export default connect(mapStateToProps, todosActions)(Todos);