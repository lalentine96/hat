import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

import TeamsList from '../teams-list/teams-list';
import InfoCard from '../info-card/info-card';
import ExplainCard from '../explain-card/explain-card';
import State from '../../models/state';
import FinishPopup from '../finish-popup/finish-popup';

import './_page.scss';

interface GamePageProps {
    isExplanationActive: boolean;
    words: string[];
}

const GamePage: React.FC<GamePageProps> = ({ isExplanationActive, words }) => {
    return (
        <div className="page game-page">
            <InfoCard />
            {
                !Boolean(words.length) &&
                <FinishPopup />
            }
            {
                isExplanationActive && <ExplainCard />
            }
            <TeamsList />
        </div>
    )
}

const mapStatetoProps: MapStateToProps<GamePageProps, {}, State> = 
    ({ isExplanationActive, words }) => ({ isExplanationActive, words });

export default connect(mapStatetoProps)(GamePage);