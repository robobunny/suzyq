import React from 'react';
import {render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {Button, Display} from '../components/Component.js';


describe('Button', () => {
    it('should render with value when not passed a text or icon prop', () => {
        const {getByText} = render(<Button value={9}/>);
        const btn = getByText('9');
        expect(btn).toBeInTheDocument();
    });
    it('should render text when given a text prop', () => {
        const {queryByText, getByText} = render(<Button text='+' value='plus'/>);
        const btn = getByText('+');
        const noBtn = queryByText('plus');
        expect(btn).toBeInTheDocument();
        expect(noBtn).not.toBeInTheDocument();
    });
    it('should call its onClick with its value when clicked', () => {
        const mockOnClick = jest.fn();
        const {getByText} = render(<Button value={1} onClick={mockOnClick}/>);
        const btn = getByText('1');
        userEvent.click(btn);
        expect(mockOnClick).toHaveBeenCalledWith(1);
    });
});

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
