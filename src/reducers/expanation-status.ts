import State from "../models/state";
import HatAction from "../models/hat-action";
import { Reducer } from "redux";

const explanationStatus: Reducer<State, HatAction> = (state, action) => {
    switch(action.type) {
        case 'EXPLAIN_STARTED': {
            return {
                ...state,
                isExplanationActive: true
            } as State;
        }

        case 'EXPLAIN_FINISHED': {
            return {
                ...state,
                isExplanationActive: false,
            } as State; 
        }

        default:
            return state as State;
    }
};

export default explanationStatus;