import React, { useState, MouseEvent } from 'react';
import { ActionCreator } from 'redux';
import { connect, MapStateToProps } from 'react-redux';

import Button from '../button/button';
import HatAction from '../../models/hat-action';
import State from '../../models/state';
import { addPlayer } from '../../actions/index';

import './_add-player-form.scss';
import '../validation-message/_validation-message.scss';

interface AddPlayerFormStateProps {
    players: string[];
}

interface AddPlayerFormDispatchProps {
    addPlayer: ActionCreator<HatAction>
}

const AddPlayerForm: React.FC<
    AddPlayerFormStateProps &
    AddPlayerFormDispatchProps
> = ({ players, addPlayer }) => {
    const [ newPlayer, setNewPlayer ] = useState('');
    const [ validationMessage, setValidationMessage ] = useState('');

    const submitPlayer = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (players.includes(newPlayer.trim())) {
            setValidationMessage('Такой игрок уже есть');
        } else if (!newPlayer.trim()) {
            setValidationMessage('Имя игрока не должно быть пустым');
        } else {
            addPlayer(newPlayer);
            setNewPlayer('');
        }
    }

    return (
        <form 
            className="add-player-form"
            onSubmit={submitPlayer}>
            <input 
                className="add-player-form__input"
                placeholder="Введите имя игрока"
                value={newPlayer}
                onChange={e => {
                    setNewPlayer(e.target.value);
                    setValidationMessage(''); }} />
            <Button
                color="purple"
                onClick={() => {}}
                submit
            >
                Добавить игрока
            </Button>
            {
                <div className={"validation-message add-player-form__message" + 
                    (validationMessage && " add-player-form__message--visible")}>
                    { validationMessage }
                </div>
            }
        </form>
    );
}

const mapStateToProps: MapStateToProps<AddPlayerFormStateProps, {}, State> = ({ players }) => ({ players });

export default connect(mapStateToProps, { addPlayer })(AddPlayerForm);