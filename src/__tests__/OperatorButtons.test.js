import React from 'react';
import {render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {OperatorButtons} from '../components/OperatorButtons.js';

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
