import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import entriesReducer from "./entriesReducer";

export default combineReducers({
    usersReducer,
    entriesReducer
});