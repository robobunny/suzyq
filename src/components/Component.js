import React from 'react';

export const Button = ({value, text, icon, onClick}) =>
    <button onClick={()=>onClick(value)}>
        {icon}
        {text ? text : value}
    </button>;

export const Display = ({value, index, onChangeInput}) =>
    <input type='text' placeholder={`Operand ${index+1}`}
        value={value} onChange={(e)=>onChangeInput(index, e.target.value)}/>;

