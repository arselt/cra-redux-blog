import { BRING_BY_USER, LOADING, ERROR} from "../types/entriesTypes";

const INITIAL_STATE = {
    entries: [],
    loading: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BRING_BY_USER:
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
        
        default: return state;
    }
}