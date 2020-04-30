import State from "../models/state";
import HatAction from "../models/hat-action";
import { Reducer } from "redux";

import createRandomTeams from "../utils/random-teams";

const teams: Reducer<State, HatAction> = (state, action) => {
    switch(action.type) {
        case 'TEAMS_GENERATED': {
            return {
                ...state,
                teams: createRandomTeams(Array.from(state!.players), 2)
            } as State;
        }

        case 'WORD_EXPLAINED': {
            const { teams, currentExplainer } = state!;
            const currentPoints = teams[currentExplainer[0]].points;
            return {
                ...state,
                teams: [
                    ...teams.slice(0, currentExplainer[0]),
                    { ...teams[currentExplainer[0]], points: currentPoints + 1},
                    ...teams.slice(currentExplainer[0] + 1),
                ]
            } as State;
        }

        case 'EXPLAIN_FINISHED': {
            const { currentExplainer, teams } = state!;

            return {
                ...state,
                currentExplainer: currentExplainer[0] === teams.length - 1 ?
                    [0, currentExplainer[1] + 1] :
                    [currentExplainer[0] + 1, currentExplainer[1]]
            } as State; 
        }

        default:
            return state as State;
    }
};

export default teams;