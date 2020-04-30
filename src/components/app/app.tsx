import React from 'react';
import { connect, MapStateToProps } from 'react-redux';

//import ExplainCard from '../explain-card/explain-card';
import GamePage from '../pages/game';
import ConfigPage from '../pages/config';
import State from '../../models/state';

import './_app.scss';

interface AppStateProps {
    isGameActive: boolean;
}

const App: React.FC<AppStateProps> = ({ isGameActive }) => {
    return (
        <div className="app">
            {
                isGameActive ?
                <GamePage /> :
                <ConfigPage />
            }
        </div>
    );
}

const mapStateToProps: MapStateToProps<AppStateProps, {}, State> = ({ isGameActive }) => ({ isGameActive });

export default connect(mapStateToProps)(App);