import { Action } from "redux";

interface HatAction extends Action<string> {
    index?: number;
    words?: string;
    player?: string;
};

export default HatAction