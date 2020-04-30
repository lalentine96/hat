import State from "../models/state";
import HatAction from "../models/hat-action";
import { Reducer } from "redux";

const players: Reducer<State, HatAction> = (state, action) => {
    switch(action.type) {
        case 'PLAYER_ADDED':
            return {
                ...state,
                players: [
                    ...state!.players,
                    action.player!.trim()
                ]
            } as State;

        default:
            return state as State;
    }
};

export default players;