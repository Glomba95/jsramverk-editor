import { render, screen } from '@testing-library/react';
import CreateDocForm from './CreateDocForm';

const mocking = jest.fn();

test('renders form components', () => {
    render(<CreateDocForm toggle={mocking} editorContent="" selectedDoc={{}} setSelectedDoc={mocking} />);
    
    const headingText = screen.getByRole("heading");
    expect(headingText).toBeInTheDocument()
    
    const label = screen.getByLabelText(/Save document as:/);
    expect(label).toBeInTheDocument();
    
    const inputBox = screen.getByRole("textbox");
    expect(inputBox).toBeInTheDocument();
    
    const submitButton = screen.getByRole("button", {name: "Create"});
    expect(submitButton).toBeInTheDocument();
    
    const cancelButton = screen.getByText(/Cancel/);
    expect(cancelButton).toBeInTheDocument();
});