import React, {useState} from "react"

const nums = [1,2,3,4,5,6,7,8,9,0];

export const NumberButtons = ({onClick}) =>
    <div className='number-container'>
      {nums.map(n =>
        <button key={n} onClick={()=>onClick(n)}>{n}</button>)}
    </div>;

