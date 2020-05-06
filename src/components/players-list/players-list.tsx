import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import State from '../../models/state';
import List from '../list/list';
import { deletePlayer } from '../../actions';
import { ActionCreator } from 'redux';
import HatAction from '../../models/hat-action';

import './_players-list.scss';

interface PlayersStateProps {
    players: string[];
}

interface PlayersDispatchProps {
    deletePlayer: ActionCreator<HatAction>;
}

const PlayersList: React.FC<
    PlayersStateProps &
    PlayersDispatchProps
> = ({ players, deletePlayer }) => {
    return (    
        <List className="players-list">
            <li className="list__item">
                <h3>Свободные игроки</h3>
            </li>
            {
                players.map(player => <li 
                    className="list__item" 
                    key={player}>
                        {player}
                        <button 
                            className="list__delete"
                            onClick={() => deletePlayer(player)}>
                            &times;
                        </button>
                    </li>
                )
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

export default connect(mapStateToProps, { deletePlayer })(PlayersList);
