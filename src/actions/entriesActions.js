import Axios from "axios";
import { BRING_BY_USER, LOADING, ERROR} from "../types/entriesTypes";
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

        const updated_entries = [
            ...entries,
            response.data
        ];

        dispatch({
            type: BRING_BY_USER,
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
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Entries not available'
        })
    }
}