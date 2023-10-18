import React, { useState }  from 'react';
import docsModel            from '../models/docs.js';

import './../style/CreateDocForm.css';


export default function CreateDocForm({ toggle, editorContent, setSelectedDoc }) {
    const [name, setName] = useState("");

    // Saves new document and sets it as selectedDoc
    async function saveDoc(e) {
        e.preventDefault();
        
        if (name !== "") {
            const content = editorContent ? `${editorContent}` : "";
            const doc = {
                name: `${name}`,
                content: `${content}`
            }
            
            const newDoc = await docsModel.createDoc(doc);
            setSelectedDoc(newDoc);
            setName("");
            toggle();
        }
    }
    
    // Form to enter name of created document.
    return(
        <div className="popup">
            <div className="popup-inner">
                <h2>Create new document</h2>
                <form onSubmit={saveDoc}>
                    <label>
                        Save document as:
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </label>
                    <button type="submit" >Create</button>
                    <button type="button" onClick={() => toggle()}>Close</button>
                </form>
            </div>
        </div>
    );
}