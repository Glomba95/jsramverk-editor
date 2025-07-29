import React, { useState } from 'react';
import authModel from '../../models/auth.js';
import docsModel from '../../models/docs.js';

import './ShareDocForm.css';


export default function ShareDocForm({ selectedDocId, toggleShareDocForm }) {
    const [addUsername, setAddUsername] = useState("");

    // Saves new document and sets it as selectedDoc
    async function shareDoc(e) {
        e.preventDefault();

        if (addUsername !== "") {

            const activeUser = localStorage.getItem("activeUser");

            if (addUsername === activeUser) {
                alert("You cannot share a document with yourself.")
            } else {
                const validUsername = await authModel.verifyUser(addUsername);

                if (!validUsername) {
                    alert("No user found with that username");
                } else {
                    const result = await docsModel.shareDoc(selectedDocId, addUsername);

                    if (result.success) {
                        alert(result.message);
                        setAddUsername("");
                        toggleShareDocForm();
                    } else {
                        alert(result.message);
                    }
                }
            }
        }
    }

    // Form to set name for new document.
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Share document access and editing rights</h2>
                <form onSubmit={shareDoc}>
                    <label>
                        Share document with:
                        <input type="text" value={addUsername} onChange={e => setAddUsername(e.target.value)} />
                    </label>
                    <button type="submit">Share</button>
                    <button type="button" onClick={() => toggleShareDocForm()}>Cancel</button>
                </form>
            </div>
        </div>
    );
}