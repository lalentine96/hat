import React, { useState, useEffect } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator } from 'redux';

import State from '../../models/state';
import Button from '../button/button';
import { explainWord, finishExplain  } from '../../actions/index';
import HatAction from '../../models/hat-action';

import '../card/_card.scss';
import './_explain-card.scss';

interface ExplainCardStateProps {
    words: string[];
};

interface ExplainCardDispatchProps {
    explainWord: ActionCreator<HatAction>;
    finishExplain: ActionCreator<HatAction>;
}

const ExplainCard: React.FC<ExplainCardStateProps & ExplainCardDispatchProps> = ({ 
    words, 
    explainWord,
    finishExplain
}) => {
    const [ index, setIndex ] = useState(Math.floor(Math.random() * words.length));

    useEffect(() => {
        if (!words.length) {
            finishExplain();
        } else {
            setIndex(Math.floor(Math.random() * (words.length)));
        }
    }, [ words.length, finishExplain ]);

    const onExplainWord = () => {
        explainWord(index);
    }

    return (
        <div className="card explain-card">
            <span className="explain-card__word">
                {words[index]}
            </span>
            <div className="explain-card__buttons">
                <Button
                    color="green" 
                    onClick={onExplainWord}>
                    Отгадано
                </Button>
                <Button
                    color="red"
                    onClick={finishExplain}
                >
                    Завершить ход
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps: MapStateToProps<
    ExplainCardStateProps, 
    {}, State
> = ({ words }) => ({ words });

export default connect(mapStateToProps, { explainWord, finishExplain })(ExplainCard);