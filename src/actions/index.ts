import { ActionCreator } from "redux";
import HatAction from "../models/hat-action";

export const finishExplain: ActionCreator<HatAction> = () => {
    return { type: 'EXPLAIN_FINISHED' };
};

export const startExplain: ActionCreator<HatAction> = () => {
    return { type: 'EXPLAIN_STARTED' };
};

export const explainWord: ActionCreator<HatAction> = (index: number) => {
    return {
        type: 'WORD_EXPLAINED',
        index
    };
};

export const generateTeams: ActionCreator<HatAction> = () => {
    return {
        type: 'TEAMS_GENERATED',
    };
};

export const startGame: ActionCreator<HatAction> = () => {
    return {
        type: 'GAME_STARTED',
    };
};

export const restartGame: ActionCreator<HatAction> = () => {
    return {
        type: 'GAME_RESTARTED',
    };
};

export const addWords: ActionCreator<HatAction> = (words: string) => {
    return {
        type: 'WORDS_ADDED',
        words
    };
};

export const addPlayer: ActionCreator<HatAction> = (player: string) => {
    return {
        type: 'PLAYER_ADDED',
        player
    };
};

export const deletePlayer: ActionCreator<HatAction> = (player: string) => {
    return {
        type: 'PLAYER_DELETED',
        player
    };
};

export const deletePlayerFromTeam: ActionCreator<HatAction> = (player: string, teamIndex: number) => {
    return {
        type: 'PLAYER_DELETED_FROM_TEAM',
        player,
        teamIndex
    };
};

export const addPlayerToTeam: ActionCreator<HatAction> = (player: string, teamIndex: number) => {
    return {
        type: 'PLAYER_ADDED_TO_TEAM',
        player,
        teamIndex
    };
};

export const deleteTeam: ActionCreator<HatAction> = (names: string[]) => {
    return {
        type: 'TEAM_DELETED',
        names
    };
};

export const createTeam: ActionCreator<HatAction> = () => {
    return {
        type: 'TEAM_CREATED'
    };
};

export const initializeTeams: ActionCreator<HatAction> = (names: string[]) => {
    return {
        type: 'TEAMS_INITIALIZED',
        names
    };
};

