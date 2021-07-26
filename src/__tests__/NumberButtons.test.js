import React from 'react';
import {render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {NumberButtons} from '../components/NumberButtons.js';

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
})
