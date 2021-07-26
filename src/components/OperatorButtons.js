import React, {useState} from 'react';
import {Button} from './Component.js';

export const OperatorButtons = ({operators, setOperator}) => (
    <div className='operators-container'>
      {operators.map((o, i) =>
        <button
          key={i}
          aria-label={o.name}
          onClick={()=>setOperator(o)}
        >
          {o.display}
        </button>)}
    </div>);
