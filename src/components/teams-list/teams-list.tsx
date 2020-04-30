import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import State from '../../models/state';
import Team from '../../models/team';
import List from '../list/list';

import './_teams-list.scss';

const TeamsListItem: 
    React.FC<Team> = ({ names, points }) => {
    return (
        <li className="list__item teams-list__item">
            {names.join(' / ')} - <span className="teams-list__result">
                {points}
            </span>
        </li>
    );
}

export { TeamsListItem };

interface TeamsListProps {
    teams: Team[]
}

const TeamsList: React.FC<TeamsListProps> = ({ teams }) => {

    return (
        <>
        {
            Boolean(teams.length) &&
            <List className="teams-list">
                <li className="list__item teams-list__item">
                    <h3 className="teams-list__header">Команды</h3>
                </li>
                {
                    teams.map(team => <TeamsListItem key={team.names.join()} {...team}/>)
                }
            </List>
        }
        </>
    )
}

const mapStatetoProps: MapStateToProps<TeamsListProps, {}, State> = ({ teams }) => ({ teams });

export default connect(mapStatetoProps)(TeamsList);