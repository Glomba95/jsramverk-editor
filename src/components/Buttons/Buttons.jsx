import React, { useState } from 'react';

import DocsDropDown from "../DocsDropDown/DocsDropDown";
import CreateDocForm from "../CreateDocForm/CreateDocForm";

import docsModel from "../../models/docs";

export function DocButtons({ toggleForm, showForm, selectedDoc, setSelectedDoc, editorContent, setEditorContent }) {
    return(
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
                selectedDoc={selectedDoc}
                setSelectedDoc={setSelectedDoc}
            />}
            <DocsDropDown 
                selectedDoc={selectedDoc}
                setSelectedDoc={setSelectedDoc}
                setEditorContent={setEditorContent}
            />
        </span>
    );
};

export function SaveButton({ toggleForm, selectedDoc, editorContent} ) {
    const [buttonText, setButtonText] = useState('Save'); 

    const saveDoc = () => {
        if (!selectedDoc._id) {
            toggleForm();
        } else {
            const docId = selectedDoc._id;
            const document = {
                name: selectedDoc.name,
                content: editorContent
            }
            
            docsModel.updateDoc(docId, document);
            
            // Changes button text for 1s to confirm save
            setButtonText('Saved!');
            
            setTimeout(() => {
                setButtonText('Save');
            }, 1000);
        }
    }

    return(
        <div className="trix-save-button-container">
            <button 
                className="trix-save-button" 
                type="button" 
                onClick={saveDoc}
            >{buttonText}
            </button>
        </div>
    )
}