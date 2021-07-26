import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.js';

describe('Calculator App', () => {
    it('should perform calculations correctly', () => {
        const {getByRole, getByText, getByLabelText} = render(<App/>);
        const button1 = getByRole('button', {name: '1'});
        const button2 = getByRole('button', {name: '2'});
        const button3 = getByRole('button', {name: '3'});
        const plus = getByRole('button', {name: 'plus'});
        const minus = getByRole('button', {name: 'minus'});
        const clear = getByRole('button', {name: 'clear'});
        const calculate = getByRole('button', {name: 'Calculate!'});
        const display = getByLabelText('result');
        userEvent.click(button1);
        userEvent.click(plus);
        userEvent.click(button1);
        userEvent.click(calculate);
        expect(display.textContent).toBe('2');
    });
    it('should update active display when number buttons are pushed', () => {
        const {getAllByRole, getByText} = render(<App/>);
        const displays = getAllByRole('textbox');
        const button1 = getByText('1');
        const button7 = getByText('7');
        const button3 = getByText('3');
        userEvent.click(displays[0]);
        userEvent.click(button1);
        userEvent.click(button7);
        userEvent.click(button3);
        expect(displays[0]).toHaveValue('173');
    });
    it('should change active display when the inactive display gets focus', () => {
        const {getAllByRole, getByText} = render(<App/>);
        const displays = getAllByRole('textbox');
        const button1 = getByText('1');
        const button7 = getByText('7');
        const button3 = getByText('3');
        userEvent.click(displays[1]);
        userEvent.click(button3);
        userEvent.click(button7);
        userEvent.click(button1);
        userEvent.click(displays[0]);
        userEvent.click(button1);
        userEvent.click(button7);
        userEvent.click(button3);
        expect(displays[0]).toHaveValue('173');
        expect(displays[1]).toHaveValue('371');
    });
    it('should update operator to plus when + button is clicked', () => {
        const {getByRole, getAllByText} = render(<App/>);
        const plusBtn = getByRole('button', {name: 'plus'});
        userEvent.click(plusBtn);
        const plus = getAllByText('+');
        // one for the display and one for the button
        // XXX there's got to be a better way to test this
        expect(plus.length).toBe(2);
    });
    it('should update operator to minus when - button is clicked', () => {
        const {getByRole, getAllByText} = render(<App/>);
        const minusBtn = getByRole('button', {name: 'minus'});
        userEvent.click(minusBtn);
        const minus = getAllByText('-');
        // one for the display and one for the button
        // XXX there's got to be a better way to test this
        expect(minus.length).toBe(2);
    });
    it('should change active display on operator button click', () => {
        const {getAllByRole, getByText} = render(<App/>);
        const displays = getAllByRole('textbox');
        const button1 = getByText('1');
        const plus = getByText('+');
        userEvent.click(button1);
        userEvent.click(plus);
        userEvent.click(button1);
        userEvent.click(button1);
        expect(displays[0]).toHaveValue('1');
        expect(displays[1]).toHaveValue('11');
    });
    it('should clear active display on click clear button', () => {
        const {getByRole, getAllByRole} = render(<App/>);
        const clearBtn = getByRole('button', {name: 'clear'});
        const button1 = getByRole('button', {name: '1'});
        const displays = getAllByRole('textbox');
        userEvent.click(button1);
        userEvent.click(button1);
        userEvent.click(clearBtn);
        expect(displays[0]).toHaveValue('0');
    });
    it('should clear both displays on click clear all button', () => {
        const {getByRole, getAllByRole, getByLabelText} = render(<App/>);
        const clearAllBtn = getByRole('button', {name: 'clear all'});
        const button1 = getByRole('button', {name: '1'});
        const plusBtn= getByRole('button', {name: 'plus'});
        const displays = getAllByRole('textbox');
        userEvent.click(button1);
        userEvent.click(button1);
        userEvent.click(plusBtn);
        userEvent.click(button1);
        userEvent.click(button1);
        userEvent.click(button1);
        userEvent.click(clearAllBtn);
        expect(displays[0]).toHaveValue('0');
        expect(displays[1]).toHaveValue('0');
    });
    it('should clear operator on click clear all button', () => {
        const {getByRole, getAllByRole, getByLabelText} = render(<App/>);
        const clearAllBtn = getByRole('button', {name: 'clear all'});
        const plusBtn= getByRole('button', {name: 'plus'});
        const operatorDisp = getByLabelText('operator');
        userEvent.click(plusBtn);
        userEvent.click(clearAllBtn);
        expect(operatorDisp.textContent).toBe('');
    });
    it('should clear result display on click clear all button', () => {
        const {getByRole, getAllByRole, getByLabelText} = render(<App/>);
        const clearAllBtn = getByRole('button', {name: 'clear all'});
        const button1 = getByRole('button', {name: '1'});
        const plusBtn= getByRole('button', {name: 'plus'});
        const resultDisp = getByLabelText('result');
        const calcBtn = getByRole('button', {name: 'Calculate!'});
        userEvent.click(button1);
        userEvent.click(button1);
        userEvent.click(plusBtn);
        userEvent.click(button1);
        userEvent.click(button1);
        userEvent.click(button1);
        userEvent.click(calcBtn);
        userEvent.click(clearAllBtn);
        expect(resultDisp.textContent).toBe('0');
        
    })
});
