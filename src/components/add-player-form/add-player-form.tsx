import React, { useState, MouseEvent } from 'react';
import { ActionCreator } from 'redux';
import { connect } from 'react-redux';

import Button from '../button/button';
import HatAction from '../../models/hat-action';
import { addPlayer } from '../../actions/index';

import './_add-player-form.scss';
import '../validation/_validation.scss';

interface AddPlayerOwnProps {
    players: string[];
}

interface AddPlayerFormDispatchProps {
    addPlayer: ActionCreator<HatAction>
}

const AddPlayerForm: React.FC<
    AddPlayerOwnProps &
    AddPlayerFormDispatchProps
> = ({ players, addPlayer }) => {
    const [ newPlayer, setNewPlayer ] = useState('');
    const [ validationMessage, setValidationMessage ] = useState('');

    if (!validationMessage) {
        if (!newPlayer.trim()) {
            setValidationMessage('Имя игрока не должно быть пустым');
        }
        if (players.includes(newPlayer.trim())) {
            setValidationMessage('Такой игрок уже есть');
        }
    }

    const submitPlayer = (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (players.includes(newPlayer.trim())) {
        //     setValidationMessage('Такой игрок уже есть');
        // // } else if (!newPlayer.trim()) {
        // //     setValidationMessage('Имя игрока не должно быть пустым');
        // } else {
            addPlayer(newPlayer);
            setNewPlayer('');
        //}
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
                disabled={!!validationMessage.length}
                className="add-player-form__submit validation"
            >
                Добавить игрока
                {
                !!validationMessage.length &&
                <div className="validation__message">
                    { validationMessage }
                </div>
            }
            </Button>
            
        </form>
    );
}

//const mapStateToProps: MapStateToProps<AddPlayerFormStateProps, {}, State> = ({ players }) => ({ players });

export default connect(null, { addPlayer })(AddPlayerForm);