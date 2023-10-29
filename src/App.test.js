import { render, screen } from '@testing-library/react';
import App from './App';

test('renders menu and buttons', () => {
    render(<App />);
    
    const createNewButton = screen.getByRole("button", {name: "Create new"});
    expect(createNewButton).toBeInTheDocument()
    
    const dropDownList = screen.getByRole("combobox");
    expect(dropDownList).toBeInTheDocument();
    
    const defaultSelectOpt = screen.getByRole("option");
    expect(defaultSelectOpt).toHaveValue("0");
    
    const saveButton = screen.getByRole("button", {name: "Save"});
    expect(saveButton).toBeInTheDocument();
});