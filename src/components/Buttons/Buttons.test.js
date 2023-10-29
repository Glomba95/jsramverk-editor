import { act, fireEvent, render, screen } from '@testing-library/react';
import { SaveButton } from './Buttons';

jest.useFakeTimers();
const mocking = jest.fn();


test('save button changes text for 1s on click', async () => {
    render(<SaveButton toggleForm={mocking} selectedDoc={{_id: "123", name: "name"}} editorContent="" />);

    const btn = await screen.findByRole("button");
  
    expect(btn).toHaveTextContent(/Save/);
    

    fireEvent.click(btn);
    
    expect(btn).toHaveTextContent(/Saved!/);
    
    act(() => {
        jest.advanceTimersByTime(1000);        
    });

    expect(btn).toHaveTextContent(/Save/);
});