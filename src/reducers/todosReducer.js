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

const INITIAL_STATE = {
    todos: {},
    loading: false,
    error: '',
    user_id: '',
    title: '',
    goback: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BRING_TODOS:
            return {
                ...state,
                todos: action.payload,
                loading: false,
                error: '',
                goback: false
            };

        case LOADING:
            return { ...state, loading: true };
        
        case ERROR:
            return { ...state, error: action.payload, loading: false };

        case CHANGE_USER_ID:
            return { ...state, user_id: action.payload };

        case CHANGE_TITLE:
            return { ...state, title: action.payload };

        case SAVED:
            return {
                ...state,
                todos: {},
                loading: false,
                error: '',
                goback: true,
                user_id: '',
                title: ''
            }

        case UPDATE:
            return { ...state, todos: action.payload };

        // case CLEAN:
        //     return { ...state, user_id:'', title:'' };
        
        default: return state;
    }
}