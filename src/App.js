import React, {useState} from 'react';
import {Display,
    OperatorButtons,
    NumberButtons} from './components/Components.js';
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
    const [result, setResult] = useState(undefined);
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
    const calculate = () => {
        setResult(operator.operation(...operands));
    };
    return (
      <div className='calculator'>
        <div className='display-container'>
          <Display 
            value={operands[0]}
            index={0}
            onChangeInput={setInputs}
            setActiveDisp={setActiveDisp}/>
          <p className='operator-display' aria-label='operator'>
            {operator?.display || ''}
          </p>  
          <Display 
            value={operands[1]}
            index={1}
            onChangeInput={setInputs}
            setActiveDisp={setActiveDisp}/>
          <p className='result' aria-label='result'>{result || ''}</p>
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

