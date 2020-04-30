import React, { PropsWithChildren } from 'react';

import './_list.scss';

interface ListProps {
    className: string;
}

const List: React.FC<PropsWithChildren<ListProps>> = ({ children, className }) => {
    return (
        <ul className={`list ${className}`}>
            {children}
        </ul>
    );
}

export default List;