import React from 'react';

export const Display = ({value, index, onChangeInput, setActiveDisp}) =>
    <input
        type='text'
        className='input--display'
        aria-label={`Operand ${index+1}`}
        value={value}
        onFocus={()=>setActiveDisp(index)}
        onChange={(e)=>onChangeInput(index, e.target.value)}/>;

const nums = [1,2,3,4,5,6,7,8,9,0];

export const NumberButtons = ({onClick}) =>
    <div className='container--buttons--numbers'>
      {nums.map(n =>
        <button className='number' key={n} onClick={()=>onClick(n)}>
          {n}
        </button>
      )}
    </div>;

export const OperatorButtons = ({operators, setOperator}) => (
    <div className='container--buttons--operators'>
      {operators.map((o, i) =>
        <button
          className='operator'
          key={i}
          aria-label={o.name}
          onClick={()=>setOperator(o)}
        >
          {o.display}
        </button>)}
    </div>);
