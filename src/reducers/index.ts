import State from "../models/state";
import reduceReducers from 'reduce-reducers';
import words from "./words";
import players from "./players";
import teams from "./teams";
import gameStatus from "./game-status";
import explanationStatus from "./expanation-status";


export const initialState: State = {
    words: [],
    players: [],
    teams: [],
    currentExplainer: [0, 0],
    isGameActive: false,
    isExplanationActive: false
};

const reducer = reduceReducers<State>(
    initialState,
    gameStatus,
    teams,
    players,
    words,
    explanationStatus
);

export default reducer;