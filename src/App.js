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
        _setOperator(undefined);
        setResult(undefined);
    };
    const calculate = () => {
        try {
            setResult(operator.operation(...operands));
        } catch (e) {
            console.log(e)
            clearAll();
        }
    };
    return (
      <div className='container--calculator'>
        <div className='container--displays'>
          <div className='container--operation'>
            <Display 
              value={operands[0]}
              index={0}
              onChangeInput={setInputs}
              setActiveDisp={setActiveDisp}/>
            <p className='display--operator' aria-label='operator'>
              {operator?.display || ''}
            </p>  
            <Display 
              value={operands[1]}
              index={1}
              onChangeInput={setInputs}
              setActiveDisp={setActiveDisp}/>
          </div>
          <p className='display--result' aria-label='result'>
            {result || '0'}
          </p>
        </div>
        <div className='container--buttons'>
          <div className='container--buttons--clear'>
            <button
              className='button--clear'
              aria-label='clear'
              onClick={clearActive}
            >
              C
            </button>
            <button
              className='button--clear-all'
              aria-label='clear all'
              onClick={clearAll}
            >
              CA
            </button>
          </div>
          <div className='container--buttons--num-oper'>
            <NumberButtons
              onClick={(v)=>{
                setInputs(activeDisp, operands[activeDisp].toString() 
                    + v.toString());
              }}/>
            <OperatorButtons 
              operators={operators}
              setOperator={setOperator}/>
          </div>
          <button className='button--calculate' onClick={calculate}>
            Calculate!
          </button>
        </div>
      </div>
    );
};

