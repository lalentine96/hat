import Team from "./team";

interface State {
    words: string[];
    players: string[];
    teams: Team[];
    currentExplainer: [number, number];
    isGameActive: boolean;
    isExplanationActive: boolean;
}

export default State;