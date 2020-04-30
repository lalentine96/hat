import React, { EventHandler, MouseEvent, PropsWithChildren } from 'react';

import './_button.scss';

interface ButtonProps {
    color: 'red' | 'green' | 'purple';
    className?: string;
    disabled?: boolean;
    submit?: boolean;
    onClick: EventHandler<MouseEvent<HTMLButtonElement>>;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ 
    className,
    color, 
    onClick, 
    children,
    disabled,
    submit
}) => {
    return (
        <button 
            disabled={disabled}
            className={`button button--${color + 
                (className ? ` ${className}` : '')}`}
            onClick={onClick}
            type={submit ? 'submit' : 'button'}
        >
            {children}
        </button>
    )
}

export default Button;