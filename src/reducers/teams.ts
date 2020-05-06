import State from "../models/state";
import HatAction from "../models/hat-action";
import { Reducer } from "redux";
import Team from "../models/team";

const createEmptyTeams = (numOfPlayers: number, teamSize: number) => {
    let teams: Team[] = new Array(Math.floor(numOfPlayers / teamSize));

    for (let i = 0; i < teams.length; i++) {
        teams[i] = { names: [], points: 0 }
    }

    return teams;
}

const createRandomTeams = (players: string[], teamSize: number) => {
    let teams = createEmptyTeams(players.length, teamSize);
    const shuffledPlayers = [...players].sort(() => .5 - Math.random());

    let playersIndex = 0;
    for (let i = 0; i < teams.length; i++) {
        teams[i].names = new Array(teamSize + Number(i < players.length % teamSize));
        for (let j = 0; j < teams[i].names.length; j++) {
            teams[i].names[j] = shuffledPlayers[playersIndex];
            playersIndex++;
        }
    }

    return teams;
}

const changePlayersInTeam = (
    state: State, 
    teamIndex: number, 
    player: string, 
    type: string
) => {
    const { teams } = state!;
    let newNames = [];

    
    if (type === 'PLAYER_DELETED_FROM_TEAM') {
        const playerIndex = teams[teamIndex].names.indexOf(player);

        newNames = [
            ...teams[teamIndex!].names.slice(0, playerIndex),
            ...teams[teamIndex!].names.slice(playerIndex + 1)
        ];
    } else {
        newNames = [
            ...teams[teamIndex!].names,
            player
        ];
    }

    return {
        ...state,
        teams: [
            ...teams.slice(0, teamIndex),
            {
                ...teams[teamIndex!],
                names: newNames
            },
            ...teams.slice(teamIndex! + 1),
        ]
    } as State;
}

const teamsReducer: Reducer<State, HatAction> = (state, action) => {
    switch(action.type) {
        case 'TEAMS_GENERATED': {
            const allPlayers = [
                ...state!.players,
                ...state!.teams.reduce(
                    (players: string[], team) => ([...players, ...team.names]), [])
            ]
            return {
                ...state,
                teams: createRandomTeams(allPlayers, 2)
            } as State;
        }

        case 'TEAMS_INITIALIZED': {
            return {
                ...state,
                teams: [ { names: [], points: 0 } ]
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

        case 'PLAYER_ADDED_TO_TEAM':
        case 'PLAYER_DELETED_FROM_TEAM': {
            const { teamIndex, player, type } = action;

            return changePlayersInTeam(state!, teamIndex!, player!, type) as State;
        }

        case 'TEAM_CREATED': {

            return {
                ...state,
                teams: [
                    ...state!.teams,
                    { names: [], points: 0 },
                ]
            } as State;
        }

        case 'TEAM_DELETED': {
            const { names } = action;
            const teamIndex = state!.teams.findIndex(t => t.names.toString() === names!.toString());

            return {
                ...state,
                teams: [
                    ...state!.teams.slice(0, teamIndex),
                    ...state!.teams.slice(teamIndex! + 1),
                ]
            } as State;
        }

        default:
            return state as State;
    }
};

export default teamsReducer;