import React, { Component } from 'react';
import PropTypes from 'prop-types';
const Input = ({type, name, id, value, onchange, placeholder, active_disabled, onblur})=>{
    return(
        <React.Fragment>
            <input 
                type={type} 
                name={name} 
                id={id} 
                value={value} 
                onChange={onchange} 
                placeholder={placeholder} 
                disabled={active_disabled}
                onBlur={onblur}
            ></input>
        </React.Fragment>
    )
}
Input.propTypes = {
    active_disabled : PropTypes.bool
};
Input.defaultProps = {
    active_disabled : false
}
export default Input;