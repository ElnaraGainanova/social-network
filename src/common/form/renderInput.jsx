import React from "react";
import s from './renderInput.module.css';

let renderInput = ({input, placeholder, type, meta: { touched, error, warning }}) => {
    return (
        <>
            <input className={s.input}
                {...input} placeholder={placeholder} type={type}/>
            {touched && error && <div>{error}</div>}
            {touched && warning && <div>{warning}</div>}
        </>

    );
};

export default renderInput;