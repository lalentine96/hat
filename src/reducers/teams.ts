import State from "../models/state";
import HatAction from "../models/hat-action";
import { Reducer } from "redux";
import Team from "../models/team";

const createEmptyTeams = (numOfPlayers: number, teamSize: number) => {
    let teams: Team[] = new Array(Math.floor(numOfPlayers / teamSize));
    teams.fill({ names: [], points: 0 });

    for (let i = 0; i < teams.length; i++) {
        teams[i].names = new Array(teamSize + Number(i < numOfPlayers % teamSize))
        teams[i].names.fill('');
    }

    return teams;
}

const createRandomTeams = (players: string[], teamSize: number) => {
    let teams = createEmptyTeams(players.length, teamSize);
    const shuffledPlayers = [...players].sort(() => .5 - Math.random());

    let playersIndex = 0;
    for (let team of teams) {
        for (let i = 0; i < team.names.length; i++) {
            team.names[i] = shuffledPlayers[playersIndex];
            playersIndex++;
        }
    }

    return teams;
}

const teams: Reducer<State, HatAction> = (state, action) => {
    switch(action.type) {
        case 'TEAMS_GENERATED': {
            return {
                ...state,
                teams: createRandomTeams(state!.players, 2)
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