import React, { useEffect, useState } from 'react';
import { connect, MapStateToProps } from 'react-redux';
import { ActionCreator } from 'redux';

import State from '../../models/state';
import { startExplain, finishExplain } from '../../actions/index';
import HatAction from '../../models/hat-action';
import Button from '../button/button';

import '../card/_card.scss';
import './_info-card.scss';

const DURATION = 5;

interface InfoCardStateProps {
    isExplanationActive: boolean;
    explainer: string;
    guesser: string;
    points: number;
};

interface InfoCardDispatchProps {
    startExplain: ActionCreator<HatAction>;
    finishExplain: ActionCreator<HatAction>;
};

const InfoCard: React.FC<InfoCardStateProps & InfoCardDispatchProps> = ({ 
    isExplanationActive, 
    explainer, 
    guesser, 
    points,
    startExplain,
    finishExplain
}) => {

    const [seconds, setSeconds] = useState(NaN);
    const [ timer, setTimer ] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (seconds === DURATION) {
            setTimer(setInterval(() => setSeconds(sec => --sec), 1000));
        }
        if (seconds === 0) {
            finishExplain();
        }
    }, [ seconds, finishExplain ]);

    useEffect(() => {
        if (!isExplanationActive) {
            clearInterval(timer as NodeJS.Timeout);
            setTimer(null);
            setSeconds(NaN);
        }
    }, [ isExplanationActive, timer])

    const onStartExplain = () => {
        startExplain();
        setSeconds(DURATION);
    }

    return (
        <div className="card info-card">
            <div className="info-card__players">
                Сейчас <span 
                    className="info-card__player"
                >{explainer}</span> объясняет <span 
                    className="info-card__player"
                >{guesser}</span>
            </div>
            {
                isExplanationActive ?
                <>
                    <div className="info-card__timer">Осталось: {seconds}</div>
                    <div className="info-card__counter">
                        Итоговый результат команды: {points} 
                    </div>
                </> :
                <Button 
                    color="purple"
                    onClick={onStartExplain}
                >
                    Начать ход
                </Button>
            }
        </div>
    )
}

const mapStateToProps: MapStateToProps<InfoCardStateProps, {}, State> = 
    ({ teams, currentExplainer, isExplanationActive }) => {
    const { names, points } = teams[currentExplainer[0]];

    return {
        isExplanationActive,
        explainer: names[currentExplainer[1] % names.length],
        guesser: names.filter((_, i) => i !== currentExplainer[1] % names.length).join(' и '),
        points
    }
}

export default connect(mapStateToProps, { startExplain, finishExplain })(InfoCard);