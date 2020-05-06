import React from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator } from 'redux';

import Popup from '../popup/popup';
import Team from '../../models/team';
import TeamsListItem from '../teams-list-item/teams-list-item';
import State from '../../models/state';
import Button from '../button/button';
import HatAction from '../../models/hat-action';
import { restartGame } from '../../actions';

interface FinishPopupStateProps {
    teams: Team[];
}

interface FinishPopupDispatchProps {
    restartGame: ActionCreator<HatAction>;
}

const FinishPopup: React.FC<
    FinishPopupStateProps &
    FinishPopupDispatchProps
> = ({ teams, restartGame }) => {
    return (
        <Popup>
            <h1>Игра окончена!</h1>
            <ol>
                { 
                    [...teams].sort((a, b) => b.points - a.points).map((team, i) => {
                        return <TeamsListItem {...team} key={team.names.join() + i} index={i} />
                    })
                }
            </ol>
            <Button
                color="purple"
                onClick={restartGame}
            >
                Начать новую игру
            </Button>
        </Popup>
    );
}

const mapStateToProps: MapStateToProps<FinishPopupStateProps, {}, State> = 
    ({ teams }) => ({ teams });

export default connect(mapStateToProps, { restartGame })(FinishPopup);