import { 
    UPDATE,
    LOADING,
    ERROR,
    COMMENT_UPDATE,
    COMMENT_LOADING,
    COMMENT_ERROR
} from "../types/entriesTypes";

const INITIAL_STATE = {
    entries: [],
    loading: false,
    error: '',
    comment_loading: false,
    comment_error: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE:
            return {
                ...state,
                entries: action.payload,
                loading: false,
                error: ''
            };

        case LOADING:
            return { ...state, loading: true };

        case ERROR:
            return { ...state, error: action.payload, loading: false };

        case COMMENT_UPDATE:
            return {
                ...state,
                entries: action.payload,
                comment_loading: false,
                comment_error: ''
            };

        case COMMENT_LOADING:
            return { ...state, comment_loading: true };

        case COMMENT_ERROR:
            return { ...state, comment_error: action.payload, comment_loading: false };
        
        default: return state;
    }
}