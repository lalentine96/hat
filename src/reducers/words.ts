import State from "../models/state";
import HatAction from "../models/hat-action";
import { Reducer } from "redux";

const wordsReducer: Reducer<State, HatAction> = (state, action) => {
    switch(action.type) {
        case 'WORDS_ADDED':
            return {
                ...state,
                words: [
                    ...state!.words,
                    ...action.words!.split(';')
                        .map(word => word.trim().toLocaleLowerCase())
                        .filter(word => word)
                ]
            } as State;

        case 'WORD_EXPLAINED': {
            const index = action.index as number;
            const { words } = state!;
            return {
                ...state,
                words: [
                    ...words.slice(0, index),
                    ...words.slice(index + 1)
                ]
            } as State;
        }
        
        default:
            return state as State;
    }
}

export default wordsReducer;