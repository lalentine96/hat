import State from "./state";
import HatAction from "./hat-action";

type PartReducer<State, Action, PartState> 
    = (state: State | undefined, action: Action) => PartState;

type PartHatReducer<PartState> = PartReducer<State, HatAction, PartState>;

export default PartHatReducer;