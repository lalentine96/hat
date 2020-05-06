import React from 'react';
import { ActionCreator } from 'redux';
import { connect, MapStateToProps } from 'react-redux';

import PlayersList from '../players-list/players-list';
import TeamsList from '../teams-list/teams-list';
import Button from '../button/button';
import { generateTeams, initializeTeams, startGame } from '../../actions/index';
import HatAction from '../../models/hat-action';
import Team from '../../models/team';
import State from '../../models/state';
import AddWordsForm from '../add-words-form/add-words-form';
import AddPlayerForm from '../add-player-form/add-player-form';

import './_page.scss';
import '../validation/_validation.scss';

interface ConfigPageStateProps {
    teams: Team[];
    words: string[];
    freePlayers: string[];
    allPlayers: string[]
}

interface ConfigPageDispatchProps {
    generateTeams: ActionCreator<HatAction>;
    initializeTeams: ActionCreator<HatAction>;
    startGame: ActionCreator<HatAction>;
}

const ConfigPage: React.FC<
    ConfigPageStateProps & 
    ConfigPageDispatchProps
> = ({ 
    teams, 
    words,
    freePlayers,
    allPlayers,
    generateTeams, 
    initializeTeams,
    startGame
}) => {
    let validationMessage: string[] = [];

    if (!words.length) validationMessage.push('бросить слова в шляпу');
    if (!allPlayers.length) validationMessage.push('добавить игроков');
    else if (!teams.length) validationMessage.push('сгенерировать команды');
    else if (teams.filter(t => t.names.length < 2).length) validationMessage.push('добавить в каждую команду не менее 2 игроков');

    return (
        <div className="page config-page">
            <AddPlayerForm players={allPlayers}/>
                <div className="config-page__lists">
                    {
                        !!freePlayers.length &&
                        <>
                        <div className="config-page__list config-page__players">
                            <PlayersList />
                        </div>
                        </>
                    }
                    {
                        !!teams.length &&
                        <div className="config-page__list config-page__teams">
                            <TeamsList />
                        </div>
                    }
                    
                </div>
            
            <div className="config-page__team-creators">
                <Button 
                    color="purple" 
                    onClick={generateTeams}
                    className="config-page__button validation"
                    disabled={allPlayers.length < 2}
                    >
                    Сгенерировать случайные команды
                    {
                        allPlayers.length < 2 &&
                        <div className="validation__message">
                            Нужно добавить хотя бы двух игроков
                        </div>
                    }
                </Button>
                {' или '}
                <Button 
                    color="purple" 
                    onClick={() => initializeTeams(allPlayers)}
                    className="config-page__button validation"
                    disabled={allPlayers.length < 2}
                    >
                    Собрать команды самостоятельно
                    {
                        allPlayers.length < 2 &&
                        <div className="validation__message">
                            Нужно добавить хотя бы двух игроков
                        </div>
                    }
                </Button>
            </div>
            
            
            <AddWordsForm />
            <Button
                color={teams.length ? 'green' : 'red'}
                onClick={startGame}
                className="config-page__button validation"
                disabled={!!validationMessage.length}
            >
                Начать игру
                {
                    !!validationMessage.length &&
                    <div className="validation__message">
                        Нужно {validationMessage.join(' и ')}, чтобы начать игру
                    </div>
                }
            </Button>
        </div>
    );
};

const mapStateToProps: MapStateToProps<ConfigPageStateProps, {}, State> = 
    ({ teams, words, players }) => ({ 
        teams, 
        words, 
        freePlayers: players,
        allPlayers: [
            ...players,
            ...teams.reduce(
                (acc: string[], team) => ([...acc, ...team.names]), [])
        ]
     });

export default connect(mapStateToProps, { generateTeams, initializeTeams, startGame })(ConfigPage);