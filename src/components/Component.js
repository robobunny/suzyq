import React from 'react';

export const Button = ({value, text, onClick}) =>
    <button onClick={()=>onClick(value)}>{text ? text : value}</button>;

