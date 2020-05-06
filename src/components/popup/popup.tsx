import React, { PropsWithChildren } from 'react';

import '../card/_card.scss';
import './_popup.scss';

const Popup: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div className="popup">
            <div className="card popup__card">
                { children }
            </div> 
        </div>
    )
}

export default Popup;