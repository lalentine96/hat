import State from "../models/state";
import HatAction from "../models/hat-action";
import { Reducer } from "redux";
import { initialState } from ".";

const gameStatus: Reducer<State, HatAction> = (state, action) => {
    switch(action.type) {
        case 'GAME_STARTED':
            return {
                ...state,
                isGameActive: true,
            } as State;

        case 'GAME_RESTARTED':
            return initialState;

        default:
            return state as State;
    }
};

export default gameStatus;