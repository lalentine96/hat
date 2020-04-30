import React, { MouseEvent, useState } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator } from 'redux';

import Button from '../button/button';
import HatAction from '../../models/hat-action';
import { addWords } from '../../actions/index';
import State from '../../models/state';

import './_add-words-form.scss';
import declension from '../../utils/declension';

interface AddWordsFormStateProps {
    words: string[];
}

interface AddWordsFormDispatchProps {
    addWords: ActionCreator<HatAction>;
}

const AddWordsForm: React.FC<
    AddWordsFormDispatchProps &
    AddWordsFormStateProps
> = ({ addWords, words }) => {
    const [ newWords, setNewWords ] = useState('');

    const submitWords = (e : MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        addWords(newWords);
        setNewWords('');
    }

    return (
        <form 
            className="add-words-form"
            onSubmit={submitWords}>
            <label 
                htmlFor="add-words-form__textarea"
                className="add-words-form__label">
                Сейчас в шляпе {words.length} {declension(words.length, ['слово', 'слова', 'слов'])}
            </label>
            <textarea 
                className="add-words-form__textarea"
                id="add-words-form__textarea"
                placeholder="Запишите слова, которые вы хотите бросить в шляпу (через точку с запятой)"
                onChange={(e) => setNewWords(e.target.value)}
                value={newWords} >
            </textarea>
            <Button
                color="purple"
                onClick={() => {}}
                submit={true}
            >
                Бросить слова в шляпу
            </Button>
        </form>
    );
};

const mapStateToProps: MapStateToProps<AddWordsFormStateProps, {}, State> = ({ words }) => ({ words });

export default connect(mapStateToProps, { addWords })(AddWordsForm);
