import Axios from "axios";
import { 
    UPDATE,
    LOADING,
    ERROR,
    COMMENT_UPDATE,
    COMMENT_LOADING,
    COMMENT_ERROR
} from "../types/entriesTypes";
import * as usersTypes from "../types/usersTypes";

const { BRING_ALL: USERS_BRING_ALL } = usersTypes;

export const bringByUser = (key) => async(dispatch, getState) => {

    dispatch({
        type: LOADING
    })

    const { users } = getState().usersReducer;
    const { entries } = getState().entriesReducer;
    const user_id = users[key].id;

    try {
        const response = await Axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`);

        const news = response.data.map((entry) => ({
        ...entry, 
            comments: [],
            open: false
        }));

        const updated_entries = [
            ...entries,
            news
        ];

        dispatch({
            type: UPDATE,
            payload: updated_entries
        });
        
        const entries_key = updated_entries.length - 1;
        const updated_users = [...users];
        updated_users[key] = {
            ...users[key],
            entries_key
        }

        dispatch({
            type: USERS_BRING_ALL,
            payload: updated_users
        });
    } 
    catch(error) {
        dispatch({
            type: ERROR,
            payload: 'Entries not available'
        })
    }
}

export const openClose = (entry_key, comment_key) => (dispatch, getState) => {
    const { entries } = getState().entriesReducer;
    const selected = entries[entry_key][comment_key];

    const updated = {
        ...selected,
        opened: !selected.opened
    };

    const updated_entries = [...entries];
    updated_entries[entry_key] = [
        ...entries[entry_key]
    ];
    updated_entries[entry_key][comment_key] = updated;

    dispatch({
        type: UPDATE,
        payload: updated_entries
    });
}

export const bringComments = (entry_key, comment_key) => async (dispatch, getState) => {
    dispatch({
        type: COMMENT_LOADING
    })

    const { entries } = getState().entriesReducer;
    const selected = entries[entry_key][comment_key];

    try {
        const response = await Axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`)

        const updated = {
            ...selected,
            comments: response.data
        }

        const updated_entries = [...entries];
        updated_entries[entry_key] = [
            ...entries[entry_key]
        ];
        updated_entries[entry_key][comment_key] = updated;

        dispatch({
            type: COMMENT_UPDATE,
            payload: updated_entries
        });
    } catch (error) {
        dispatch ({
            type: COMMENT_ERROR,
            payload: 'Comments not available'
        })
    }
}