import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator } from 'redux';

import TeamsListItem from '../teams-list-item/teams-list-item';
import State from '../../models/state';
import Team from '../../models/team';
import List from '../list/list';
import HatAction from '../../models/hat-action';
import { deletePlayerFromTeam, deleteTeam, addPlayerToTeam, createTeam } from '../../actions/index';

import './_teams-list.scss';

interface TeamsListStateProps {
    teams: Team[];
    isGameActive: boolean;
}

interface TeamsListDispatchProps {
    deletePlayerFromTeam: ActionCreator<HatAction>;
    deleteTeam: ActionCreator<HatAction>;
    createTeam: ActionCreator<HatAction>;
    addPlayerToTeam: ActionCreator<HatAction>;
}

const TeamsList: React.FC<
    TeamsListStateProps &
    TeamsListDispatchProps
> = ({ 
    teams, 
    isGameActive,
    deletePlayerFromTeam, 
    deleteTeam, 
    createTeam, 
    addPlayerToTeam}) => {

    return (
        <>
        {
            Boolean(teams.length) &&
            <List className="teams-list">
                <li className="list__item teams-list-item">
                    <h3 className="teams-list__header">Команды</h3>
                </li>
                {
                    teams.map((team, i) => <TeamsListItem 
                                        key={team.names.join() + i.toString()} 
                                        {...team}
                                        onDeletePlayer={(player: string) => deletePlayerFromTeam(player, i)}
                                        onDeleteTeam={() => deleteTeam([...team.names])}
                                        onAddPlayer={(player: string) => addPlayerToTeam(player, i)}
                                        index={i}/>)
                }
                {
                    !isGameActive &&
                    <li 
                        className="list__item teams-list-item teams-list__new-team"
                        onClick={createTeam}>
                        <span className="material-icons">add</span> Создать новую команду
                    </li>
                }
            </List>
        }
        </>
    )
}

const mapStatetoProps: MapStateToProps<TeamsListStateProps, {}, State> = 
    ({ teams, isGameActive }) => ({ teams, isGameActive });

export default connect(mapStatetoProps, { deletePlayerFromTeam, deleteTeam, addPlayerToTeam, createTeam })(TeamsList);