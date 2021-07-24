import React from 'react';
import { render } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Button } from '../components/Component.js';


describe('Button', () => {
    it('should render with value when not passed a text or icon prop', () => {
        const {getByText} = render(<Button value={9}/>);
        const btn = getByText('9');
        expect(btn).toBeInTheDocument();
    })
    it('should render text when given a text prop', () => {
        const {queryByText, getByText} = render(<Button text='+' value='plus'/>);
        const btn = getByText('+');
        const noBtn = queryByText('plus');
        expect(btn).toBeInTheDocument();
        expect(noBtn).not.toBeInTheDocument();
    })
    it('should call its onClick with its value when clicked', () => {
        const mockOnClick = jest.fn();
        const {getByText} = render(<Button value={1} onClick={mockOnClick}/>);
        const btn = getByText('1');
        userEvent.click(btn);
        expect(mockOnClick).toHaveBeenCalledWith(1);
    })
})

