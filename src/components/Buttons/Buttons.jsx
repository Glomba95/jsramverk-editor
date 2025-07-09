import React, { useState } from 'react';

import DocsDropDown from "../DocsDropDown/DocsDropDown";
import CreateDocForm from "../CreateDocForm/CreateDocForm";

import docsModel from "../../models/docs";

import './Buttons.css';

export function DocButtons({ toggleCreateDocForm, showCreateDocForm, selectedDoc, setSelectedDoc, selectedDocId, setSelectedDocId, alterEditorContent, setLoadedDoc, loggedIn, setLoggedIn }) {
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
            {loggedIn && <LogOutButton
                setLoggedIn={setLoggedIn}
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

function LogOutButton({ setLoggedIn }) {
    const [buttonText, setButtonText] = useState('Log out');

    const logOut = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        // if (!selectedDoc._id) {
        //     toggleCreateDocForm();
        // } else {
        //     const docId = selectedDoc._id;
        //     const document = {
        //         name: selectedDoc.name,
        //         content: selectedDoc.content
        //     }

        //     docsModel.updateDoc(docId, document);

        // Changes button text for 1s to confirm logged out
        setButtonText('Logged Out!');

        setTimeout(() => {
            // REVIEW Behövs detta med en useEffect som triggar AuthForm när loggedIn = false?
            setButtonText('What now?');
        }, 1000);
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