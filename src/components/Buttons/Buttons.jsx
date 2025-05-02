import React, { useState } from 'react';

import DocsDropDown from "../DocsDropDown/DocsDropDown";
import CreateDocForm from "../CreateDocForm/CreateDocForm";

import docsModel from "../../models/docs";

export function DocButtons({ toggleForm, showForm, selectedDoc, selectedDocId, setLoadedDoc }) {
    return (
        <span className='doc-button-group trix-button-group'>
            <button
                type="button"
                onClick={toggleForm}
            >
                Create new
            </button>
            {showForm && <CreateDocForm
                toggle={toggleForm}
                selectedDoc={selectedDoc}
                setLoadedDoc={setLoadedDoc}
            />}
            <DocsDropDown
                selectedDoc={selectedDoc}
                selectedDocId={selectedDocId}
                setLoadedDoc={setLoadedDoc}
            />
        </span>
    );
};

export function SaveButton({ toggleForm, selectedDoc }) {
    const [buttonText, setButtonText] = useState('Save');

    const saveDoc = () => {
        if (!selectedDoc._id) {
            toggleForm();
        } else {
            const docId = selectedDoc._id;
            const document = {
                name: selectedDoc.name,
                content: selectedDoc.content
            }

            docsModel.updateDoc(docId, document);

            // Changes button text for 1s to confirm save
            setButtonText('Saved!');

            setTimeout(() => {
                setButtonText('Save');
            }, 1000);
        }
    }

    return (
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