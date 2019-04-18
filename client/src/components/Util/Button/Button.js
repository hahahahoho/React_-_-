import React from 'react';

const Button = ({id, onclick, text}) => {
    return (
        <React.Fragment>
            <button id={id} onClick={onclick}>{text}</button>      
        </React.Fragment>
    );      
};

export default Button;