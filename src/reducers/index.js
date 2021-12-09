import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import entriesReducer from "./entriesReducer";
import todosReducer from "./todosReducer";

export default combineReducers({
    usersReducer,
    entriesReducer,
    todosReducer
});