import React, {useState} from 'react';
import logo from './logo.svg';
import {Button, Display} from './components/Component.js';
import './App.css';


function App() {
    const [operands, setOperands] = useState([0, 0]);
    const onChangeInput = (index, input) => {
        let next = Number.parseInt(input)
        if (Number.isNaN(next))
            next = 0;
        setOperands(index, next);
    }
    return (
      <div className="App">
        <header className="App-header">
          {operands.map((o, i)=>
            <Display 
              key={i}
              value={o}
              index={i}
              onChangeInput={onChangeInput}/>)}
        </header>
      </div>
    );
}

export default App;
