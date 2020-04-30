import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import State from '../../models/state';
import List from '../list/list';

interface PlayersStateProps {
    players: string[];
}

const PlayersList: React.FC<
    PlayersStateProps
> = ({ players }) => {
    return (    
        <List className="players-list">
            <li className="list__item">
                <h3>Игроки</h3>
            </li>
            {
                players.map(player => <li className="list__item" key={player}>{player}</li>)
            }
            
        </List>      
    );
};

const mapStateToProps: MapStateToProps<
    PlayersStateProps, 
    {}, 
    State
> = ({ players }) => {
    return {
        players: Array.from(players)
    }
};

export default connect(mapStateToProps)(PlayersList);
