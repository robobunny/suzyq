import React from 'react';

export const Button = ({value, text, onClick}) =>
    <button onClick={()=>onClick(value)}>
        {text ? text : value}
    </button>;

export const Display = ({value, index, onChangeInput, setActiveDisp}) =>
    <input
        type='text'
        aria-label={`Operand ${index+1}`}
        value={value}
        onFocus={()=>setActiveDisp(index)}
        onChange={(e)=>onChangeInput(index, e.target.value)}/>;

