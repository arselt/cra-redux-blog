import axios from 'axios';
import {
    BRING_TODOS,
    LOADING,
    ERROR,
    CHANGE_USER_ID,
    CHANGE_TITLE,
    SAVED,
    UPDATE,
    CLEAN
} from '../types/todosTypes';

export const bringTodos = () => async (dispatch) => {
    dispatch({
        type: LOADING
    });
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');

        const todos = {};
        response.data.map((todo) =>(
            todos[todo.userId] = {
                ...todos[todo.userId],
                [todo.id]: {
                    ...todo
                }
            }
        ));

        dispatch({
            type: BRING_TODOS,
            payload: todos
        })
    }
    catch (error) {
        console.log('Error ', error.message);
        dispatch({
            type: ERROR,
            payload: "Todo's not available"
        })
    }
}

export const changeUserID = (user_id) => (dispatch) => {
    dispatch({
        type: CHANGE_USER_ID,
        payload: user_id
    })
}

export const changeTitle = (title) => (dispatch) => {
    dispatch({
        type: CHANGE_TITLE,
        payload: title
    })
}

export const add = (new_todo) => async(dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', new_todo);
        console.log(response.data);
        dispatch({
            type: SAVED
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Try again later'
        })
    }
}

export const edit = (edited_todo) => async(dispatch) => {
    dispatch({
        type: LOADING
    })

    try {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${edited_todo.id}`, edited_todo);
        console.log(response.data);
        dispatch({
            type: SAVED
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Try again later'
        })
    }
}

export const changeCheck = ( user_id, todo_id ) => (dispatch, getState) => {
    const { todos } = getState().todosReducer;
    const selected = todos[user_id][todo_id];

    const updated = {
        ...todos
    };

    updated[user_id] = {
        ...todos[user_id]
    };

    updated[user_id][todo_id] = {
        ...todos[user_id][todo_id],
        completed: !selected.completed
    };

    dispatch({
        type: UPDATE,
        payload: updated
    })
}

export const deleteTodo = (todo_id) => async(dispatch) => {

    dispatch({
        type: LOADING
    });

    try {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${todo_id}`);
        dispatch({
            type: BRING_TODOS,
            payload: {}
        });
    }
    catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Service not available.'
        })
    }
}

export const cleanForm = () => (dispatch) => {
    dispatch({
        type: CLEAN
    })
}