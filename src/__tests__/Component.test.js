import React from 'react';
import {render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {Display, NumberButtons, OperatorButtons} from '../components/Components.js';

describe('Display', () => {
    it('should display its value', () => {
        const setActiveDisplay = jest.fn();
        const {getByDisplayValue} = 
            render(<Display 
                value={173} 
                index={0} 
                setActiveDisp={setActiveDisplay}
                onChangeInput={()=>{}}/>);
        const disp =getByDisplayValue('173');
        expect(disp).toBeInTheDocument();
    });
    it('should allow updating value directly', () => {
        let value;
        const index = 0;
        const mockOnChange = jest.fn((i, v)=>{value = v});
        const setActiveDisp = jest.fn();
        const {getByRole} = 
            render(<Display 
                value={value} 
                index={0} 
                setActiveDisp={setActiveDisp}
                onChangeInput={mockOnChange}/>);
        const disp = getByRole('textbox', {name: 'Operand 1'});
        userEvent.dblClick(disp);
        userEvent.keyboard('371');
        expect(disp).toHaveValue('371');
        expect(mockOnChange).toHaveBeenLastCalledWith(index, '371');
    });
});

describe('NumberButtons component', () => {
    it('should render 10 buttons, each with a different digit 0-9', () => {
        const {getByText} = render(<NumberButtons/>);
        for (let i=0; i<10; i++)
        {
            let btn = getByText(i.toString());
            expect(btn).toBeInTheDocument();
        }
    });
    it('should call onClick with its value on click', () => {
        const onClickMock = jest.fn();
        const {getByText} = render(<NumberButtons onClick={onClickMock}/>);
        for (let i=0; i<10; i++)
        {
            let btn = getByText(i.toString());
            userEvent.click(btn);
            expect(onClickMock).toHaveBeenLastCalledWith(i);
        }
    });
});

const testOperators = [
    {
        display: '+',
        operation: (x, y) => x+y,
    }, {
        display: '-',
        operation: (x, y) => x-y,
    },
];

describe('OperatorButtons component', () => {
    it('should display one button for each operator', () => {
        const {getAllByRole, getByText} = 
            render(<OperatorButtons operators={testOperators}/>);
        const buttons = getAllByRole('button');
        const plus = getByText('+');
        const minus = getByText('-');
        expect(buttons.length).toBe(2);
        expect(plus).toBeInTheDocument();
        expect(minus).toBeInTheDocument();
    });
    it('should call setOperator function with corresponding operator object', () => {
        const testSetOperator = jest.fn();
        const {getByText} =
            render(<OperatorButtons
                setOperator={testSetOperator}
                operators={testOperators}/>);
        const plus = getByText('+');
        const minus = getByText('-');
        userEvent.click(plus);
        expect(testSetOperator).toHaveBeenCalledWith(testOperators[0]);
    })
})
