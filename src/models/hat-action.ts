import { Action } from "redux";

interface HatAction extends Action<string> {
    index?: number;
    words?: string;
    player?: string;
    //playerIndex?: number;
    teamIndex?: number;
    names?: string[];
};

export default HatAction;