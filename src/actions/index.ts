import { ActionCreator } from "redux";
import HatAction from "../models/hat-action";

const finishExplain: ActionCreator<HatAction> = () => {
    return { type: 'EXPLAIN_FINISHED' };
};

const startExplain: ActionCreator<HatAction> = () => {
    return { type: 'EXPLAIN_STARTED' };
};

const explainWord: ActionCreator<HatAction> = (index: number) => {
    return {
        type: 'WORD_EXPLAINED',
        index
    };
};

const generateTeams: ActionCreator<HatAction> = () => {
    return {
        type: 'TEAMS_GENERATED',
    };
};

const startGame: ActionCreator<HatAction> = () => {
    return {
        type: 'GAME_STARTED',
    };
};

const restartGame: ActionCreator<HatAction> = () => {
    return {
        type: 'GAME_RESTARTED',
    };
};

const addWords: ActionCreator<HatAction> = (words: string) => {
    return {
        type: 'WORDS_ADDED',
        words
    };
};

const addPlayer: ActionCreator<HatAction> = (player: string) => {
    return {
        type: 'PLAYER_ADDED',
        player
    };
};

export {
    explainWord,
    finishExplain,
    startExplain,
    generateTeams,
    startGame,
    restartGame, 
    addWords,
    addPlayer
};