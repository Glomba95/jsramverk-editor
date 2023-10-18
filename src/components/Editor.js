import React, { useState } from 'react';
import 'trix';
import { TrixEditor } from 'react-trix';
import './../style/Editor.css';

import DocsDropDown from './DocsDropDown';
import CreateDocForm from './CreateDocForm';

import docsModel from '../models/docs';

export default function Editor() {
    const [selectedDoc, setSelectedDoc] = useState({});
    const [editorContent, setEditorContent] = useState('');
    const [showForm, setShowForm] = useState(false);
    
    function toggleForm() {
        setShowForm(!showForm);
    };
    
    const saveDoc = () => {
        if (!selectedDoc._id) {
            toggleForm();
        } else {
            const document = selectedDoc;
            document.content = editorContent;
            docsModel.updateDoc(document);
        }
    }
    
    return (
        <>
            <span className='doc-button-group trix-button-group'>
                <button
                    type="button"
                    onClick={toggleForm}
                >
                    Create new
                </button>
                {showForm && <CreateDocForm 
                    toggle={toggleForm}
                    editorContent={editorContent}
                    setSelectedDoc={setSelectedDoc}
                />}
                <DocsDropDown 
                    selectedDoc={selectedDoc}
                    setSelectedDoc={setSelectedDoc}
                    setEditorContent={setEditorContent}
                />
            </span>
            <TrixEditor
                className="trix-content"
                autoFocus={true}
                value={editorContent}
                onChange={(value) => setEditorContent(value)}
            />
            <div className="trix-save-button-container">
                <button 
                    className="trix-save-button" 
                    type="button" 
                    onClick={saveDoc}
                >Save
                </button>
            </div>
        </>
    );
}
