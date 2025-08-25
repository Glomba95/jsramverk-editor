import React, { useState } from 'react';

import DocsDropDown from "../DocsDropDown/DocsDropDown";
import ShareDocForm from "../ShareDocForm/ShareDocForm";
import CreateDocForm from "../CreateDocForm/CreateDocForm";

import docsModel from "../../models/docs.js";

import './Buttons.css';

export function DocButtons({ toggleCreateDocForm, showCreateDocForm, selectedDoc, setSelectedDoc, selectedDocId, setSelectedDocId, alterEditorContent, setLoadedDoc, loggedIn, setLoggedIn, showShareDocForm, toggleShareDocForm }) {
    return (
        <span className='doc-button-group trix-button-group'>
            <button
                type="button"
                onClick={toggleCreateDocForm}
            >
                Create new
            </button>
            {showCreateDocForm && <CreateDocForm
                toggle={toggleCreateDocForm}
                setSelectedDocId={setSelectedDocId}
                selectedDoc={selectedDoc}
                setSelectedDoc={setSelectedDoc}
            />}
            <DocsDropDown
                selectedDoc={selectedDoc}
                setSelectedDoc={setSelectedDoc}
                alterEditorContent={alterEditorContent}
                selectedDocId={selectedDocId}
                setSelectedDocId={setSelectedDocId}
                setLoadedDoc={setLoadedDoc}
                loggedIn={loggedIn}
            />
            {selectedDocId && <button
                type="button"
                onClick={toggleShareDocForm}
            >
                Share
            </button>}
            {showShareDocForm && <ShareDocForm
                selectedDoc={selectedDoc}
                setSelectedDoc={setSelectedDoc}
                selectedDocId={selectedDocId}
                toggleShareDocForm={toggleShareDocForm}
            />}
            {loggedIn && <LogOutButton
                setLoggedIn={setLoggedIn}
                setLoadedDoc={setLoadedDoc}
            />}
        </span>
    );
};

export function SaveButton({ toggleCreateDocForm, selectedDoc }) {
    const [buttonText, setButtonText] = useState('Save');

    const saveDoc = () => {
        if (!selectedDoc._id) {
            toggleCreateDocForm();
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


function LogOutButton({ setLoggedIn, setLoadedDoc }) {
    const [buttonText, setButtonText] = useState('Log out');

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("activeUser");
        setButtonText('Logged Out!');
        setLoggedIn(false);
        setLoadedDoc();
    }

    return (
        <button
            className="logout-button"
            type="button"
            onClick={logOut}
        >{buttonText}
        </button>

    )
}