import React from 'react';
import { ActionCreator } from 'redux';
import { connect, MapStateToProps } from 'react-redux';

import PlayersList from '../players-list/players-list';
import TeamsList from '../teams-list/teams-list';
import Button from '../button/button';
import { generateTeams, startGame } from '../../actions/index';
import HatAction from '../../models/hat-action';
import Team from '../../models/team';
import State from '../../models/state';
import AddWordsForm from '../add-words-form/add-words-form';
import AddPlayerForm from '../add-player-form/add-player-form';

import './_page.scss';
import '../validation-message/_validation-message.scss';

interface ConfigPageStateProps {
    teams: Team[];
    words: string[];
    players: string[];
}

interface ConfigPageDispatchProps {
    generateTeams: ActionCreator<HatAction>;
    startGame: ActionCreator<HatAction>;
}

const ConfigPage: React.FC<
    ConfigPageStateProps & 
    ConfigPageDispatchProps
> = ({ 
    teams, 
    words,
    players,
    generateTeams, 
    startGame
}) => {
    let validationMessage: string[] = [];

    if (!words.length) validationMessage.push('бросить слова в шляпу');
    if (!players.length) validationMessage.push('добавить игроков');
    else if (!teams.length) validationMessage.push('сгенерировать команды');

    return (
        <div className="page config-page">
            <AddPlayerForm />
            {
                !!players.length &&
                <div className="config-page__lists">
                    <div className="config-page__list config-page__players">
                        <PlayersList />
                        <Button 
                            color="purple" 
                            onClick={generateTeams}
                            className="config-page__button"
                        >
                            Сгенерировать случайные команды
                        </Button>
                    </div>
                    {
                        !!teams.length &&
                        <div className="config-page__list config-page__teams">
                            <TeamsList />
                        </div>
                    }
                </div>
            }
            
            <AddWordsForm />
            <Button
                color={teams.length ? 'green' : 'red'}
                onClick={startGame}
                className="config-page__button"
                disabled={!!validationMessage.length}
            >
                Начать игру
            </Button>
            {
                !!validationMessage.length &&
                <div className="config-page__message validation-message">
                    Нужно {validationMessage.join(' и ')}, чтобы начать игру
                </div>
            }
        </div>
    );
};

const mapStateToProps: MapStateToProps<ConfigPageStateProps, {}, State> = 
    ({ teams, words, players }) => ({ teams, words, players });

export default connect(mapStateToProps, { generateTeams, startGame })(ConfigPage);