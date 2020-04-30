import State from "../models/state";
import reduceReducers from 'reduce-reducers';
// import HatAction from "../models/hat-action";
// import { Reducer } from "redux";
// import createRandomTeams from "../utils/random-teams";
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
    players,
    words,
    teams,
    explanationStatus
);

// const reducer: Reducer<State, HatAction> = (state = initialState, action) => {
//     console.log(action.type);

//     switch(action.type) {
//         case 'WORD_EXPLAINED': {
//             const index = action.index as number;
//             const { words, teams, currentExplainer } = state;
//             const currentPoints = teams[currentExplainer[0]].points;
//             return {
//                 ...state,
//                 words: [
//                     ...words.slice(0, index),
//                     ...words.slice(index + 1)
//                 ],
//                 teams: [
//                     ...teams.slice(0, currentExplainer[0]),
//                     { ...teams[currentExplainer[0]], points: currentPoints + 1},
//                     ...teams.slice(currentExplainer[0] + 1),
//                 ]
//             };
//         }

//         case 'EXPLAIN_FINISHED': {
//             const { currentExplainer, teams } = state;

//             return {
//                 ...state,
//                 isExplanationActive: false,
//                 currentExplainer: currentExplainer[0] === teams.length - 1 ?
//                     [0, currentExplainer[1] + 1] :
//                     [currentExplainer[0] + 1, currentExplainer[1]]
//             }; 
//         }

//         case 'EXPLAIN_STARTED': {
//             return {
//                 ...state,
//                 isExplanationActive: true
//             }
//         }

//         case 'TEAMS_GENERATED': {
//             return {
//                 ...state,
//                 teams: createRandomTeams(Array.from(state.players), 2)
//             }
//         }

//         case 'GAME_STARTED':
//             return {
//                 ...state,
//                 isGameActive: true,
//             }

//         case 'GAME_RESTARTED':
//             return initialState;

//         case 'WORDS_ADDED':
//             return {
//                 ...state,
//                 words: [
//                     ...state.words,
//                     ...action.words!.split(';')
//                         .map(word => word.trim().toLocaleLowerCase())
//                         .filter(word => word)
//                 ]
//             }

//         case 'PLAYER_ADDED':
//             return {
//                 ...state,
//                 players: [
//                     ...state.players,
//                     action.player!.trim()
//                 ]
//             }

//         default: {
//             return state;
//         }
//     }
// }

export default reducer;