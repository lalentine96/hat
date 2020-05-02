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

        case 'PLAYER_DELETED': {
            const index = state!.players.indexOf(action.player!);
            return {
                ...state,
                players: [
                    ...state!.players.slice(0, index),
                    ...state!.players.slice(index + 1)
                ]
            } as State;
        }

        default:
            return state as State;
    }
};

export default players;