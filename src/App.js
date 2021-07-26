import React, {useState} from 'react';
import logo from './logo.svg';
import {Display} from './components/Component.js';
import {OperatorButtons} from './components/OperatorButtons.js';
import {NumberButtons} from './components/NumberButtons.js';
import './App.css';

const operators = [
    {
        name: 'plus',
        display: '+',
        operation: (x, y) => x+y,
    }, {
        name: 'minus',
        display: '-',
        operation: (x, y) => x-y,
    },
];

export default function App() {
    const [operands, setOperands] = useState([0, 0]);
    const [operator, _setOperator] = useState(undefined);
    const [activeDisp, setActiveDisp] = useState(0);
    const setInputs = (index, input) => {
        let next = Number.parseInt(input)
        if (Number.isNaN(next))
            next = 0;
        let inputs = [...operands];
        inputs[index] = next;
        setOperands(inputs);
    };
    const setOperator = (o) => {
        _setOperator(o);
        setActiveDisp(1);
    };
    const clearActive = () => {
        setInputs(activeDisp, '');
    };
    const clearAll = () => {
        setOperands([0, 0]);
        setActiveDisp(0);
    };
    const calculate = () => {};
    return (
      <div className='calculator'>
        <div className='display-container'>
          <Display 
            value={operands[0]}
            index={0}
            onChangeInput={setInputs}
            setActiveDisp={setActiveDisp}/>
          <p className='operator-display'>{operator?.display || ''}</p>  
          <Display 
            value={operands[1]}
            index={1}
            onChangeInput={setInputs}
            setActiveDisp={setActiveDisp}/>
        </div>
        <div className='buttons-container'>
          <NumberButtons
            onClick={(v)=>{
              setInputs(activeDisp, operands[activeDisp].toString() 
                  + v.toString());
            }}/>
          <OperatorButtons 
            operators={operators}
            setOperator={setOperator}/>
          <div className='clear-buttons'>
            <button
              className='clear-button'
              aria-label='clear'
              onClick={clearActive}
            >
              C
            </button>
            <button
              className='clear-all-button'
              aria-label='clear all'
              onClick={clearAll}
            >
              CA
            </button>
          </div>
          <button className='calculate-button' onClick={calculate}>
            Calculate!
          </button>
        </div>
      </div>
    );
};

