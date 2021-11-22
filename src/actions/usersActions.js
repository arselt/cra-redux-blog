import axios from "axios";
import { BRING_ALL, ERROR, LOADING } from "../types/usersTypes";

export const bringAll = () => async (dispatch) => {
    dispatch({
        type: LOADING
    })
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispatch({
            type: BRING_ALL,
            payload: response.data
        })
    }
    catch (error) {
        console.error("ERROR: " + error.message)
        dispatch({
            type: ERROR,
            payload: "Something went wrong, plese try again later."
        })
    }
}