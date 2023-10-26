import React, { useState } from 'react';

import { Editor, DocButtons, SaveButton } from './components';

import './App.css';

function App() {
    const [selectedDoc, setSelectedDoc] = useState({});
    const [editorContent, setEditorContent] = useState('');
    const [showForm, setShowForm] = useState(false);
    
    // Toggle CreateDocForm
    function toggleForm() {
        setShowForm(!showForm);
    };
    
    return (
        <>
            <DocButtons 
                toggleForm={toggleForm}
                showForm={showForm}
                selectedDoc={selectedDoc}
                setSelectedDoc={setSelectedDoc}
                editorContent={editorContent}
                setEditorContent={setEditorContent}
            />
            <Editor 
                editorContent={editorContent}
                setEditorContent={setEditorContent}
            />
            <SaveButton 
                toggleForm={toggleForm}
                selectedDoc={selectedDoc}
                editorContent={editorContent}
            />
        </>
    );
}

export default App;
