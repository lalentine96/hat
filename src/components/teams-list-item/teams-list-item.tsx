import React, { useState, KeyboardEvent } from 'react';
import { ActionCreator } from 'redux';
import { connect, MapStateToProps } from 'react-redux';

import HatAction from '../../models/hat-action';
import Team from '../../models/team';
import State from '../../models/state';

import './_team-list-item.scss';
import declension from '../../utils/declension';

interface TeamsListItemStateProps {
    isGameActive: boolean;
    players: string[];
}

interface TeamListItemOwnProps {
    onDeletePlayer?: ActionCreator<HatAction>;
    onDeleteTeam?: ActionCreator<HatAction>;
    onAddPlayer?: ActionCreator<HatAction>;
    index: number;
}

const TeamsListItem: 
    React.FC<
    Team & 
    TeamsListItemStateProps &
    TeamListItemOwnProps
> = ({ 
    index,
    names, 
    points, 
    isGameActive, 
    players,
    onDeletePlayer, 
    onDeleteTeam,
    onAddPlayer
}) => {
    const [ newPlayer, setNewPlayer ] = useState('');

    const onInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ArrowDown") {
            ((e.target as HTMLInputElement)
                .nextElementSibling!.firstElementChild! as HTMLLIElement).focus();
        }
    }

    const onLiKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
        let nextEl: Element | null = null;

        if (e.key === "Enter") {
            onAddPlayer!((e.target as HTMLLIElement).textContent);
            return;
        } else if (e.key === "ArrowDown") {
            nextEl = (e.target as HTMLLIElement).nextElementSibling;
        } else if (e.key === "ArrowUp") {
            nextEl = (e.target as HTMLLIElement).previousElementSibling;

            if (!nextEl) {
                const inputEl = ((e.target as HTMLLIElement)
                    .parentElement!.previousElementSibling as HTMLInputElement);
                inputEl.focus();
                setTimeout(() => inputEl.setSelectionRange(newPlayer.length, newPlayer.length), 0);
                return;
            }
        }

        if (nextEl) {
            (nextEl as HTMLLIElement).focus();
        }
    }

    return (
        <li className="list__item teams-list-item">
            <div className="teams-list-item__team">
                <span className="teams-list-item__names">
                    {
                        names.length ?
                        names.map(name => {
                            return <span key={name} className="teams-list-item__name">
                                {name}
                                {!isGameActive && 
                                <button 
                                    className="list__delete"
                                    onClick={() => onDeletePlayer!(name)}>
                                    &times;
                                </button>}
                            </span>
                        }) :
                        <label 
                            className="teams-list-item__placeholder"
                            htmlFor={"teams-list-item__input--" + names.join() + index}>
                            Добавьте первого игрока
                        </label>
                    }
                </span>
                {
                    isGameActive ?
                    <span className="teams-list-item__result">
                        {`${points} ${declension(points, ['очко', 'очка', 'очков'])}`}
                    </span> :
                    <div className="teams-list-item__icons">
                        <span 
                            className="material-icons teams-list-item__icon"
                            onClick={() => setNewPlayer('')}
                            title="Добавить игрока в команду">
                            <label htmlFor={"teams-list-item__input--" + names.join() + index}>
                            person_add
                            </label>
                        </span>
                        <span 
                            className="material-icons teams-list-item__icon"
                            onClick={onDeleteTeam}
                            title="Удалить команду">
                            delete
                        </span>
                    </div>
                }
            </div>
            <form className="teams-list-item__form">
                <input 
                    className="teams-list-item__input"
                    id={"teams-list-item__input--" + names.join() + index}
                    type="text"
                    placeholder="Введите имя игрока"
                    onChange={e => {
                        //console.log('on change');
                        setNewPlayer(e.target.value);
                    }}
                    value={newPlayer}
                    onKeyDown={onInputKeyDown} />
                <ul className="teams-list-item__players">
                    { 
                        players
                            .filter(p => p.toLowerCase().includes(newPlayer.toLowerCase()))
                            .map((name, i) => <li 
                                className="teams-list-item__player" 
                                key={name}
                                onClick={() => onAddPlayer!(name)}
                                onKeyDown={onLiKeyDown}
                                tabIndex={i}>
                                    {name}
                                </li>) 
                    }
                </ul>
            </form>
            
        </li>
    );
};

const mapStatetoProps: MapStateToProps<TeamsListItemStateProps, {}, State> = 
    ({ isGameActive, players }) => ({ isGameActive, players });

export default connect(mapStatetoProps)(TeamsListItem);