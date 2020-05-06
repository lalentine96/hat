import State from "../models/state";
import HatAction from "../models/hat-action";
import { Reducer } from "redux";

const playersReducer: Reducer<State, HatAction> = (state, action) => {
    switch(action.type) {
        case 'PLAYER_ADDED':
        case 'PLAYER_DELETED_FROM_TEAM':
            return {
                ...state,
                players: [
                    ...state!.players,
                    action.player!.trim()
                ]
            } as State;
        
        case 'TEAM_DELETED':
            return {
                ...state,
                players: [
                    ...state!.players,
                    ...action.names!
                ]
            } as State;
        
        case 'TEAMS_INITIALIZED': {
            return {
                ...state,
                players: action.names!
            } as State;
        }

        case 'PLAYER_DELETED':
        case 'PLAYER_ADDED_TO_TEAM': {
            const index = state!.players.indexOf(action.player!);
            return {
                ...state,
                players: [
                    ...state!.players.slice(0, index),
                    ...state!.players.slice(index + 1)
                ]
            } as State;
        }

        case 'TEAMS_GENERATED':
            return {
                ...state,
                players: []
            } as State;

        default:
            return state as State;
    }
};

export default playersReducer;