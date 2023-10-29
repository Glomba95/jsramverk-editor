import React, { useState }  from 'react';
import docsModel            from '../../models/docs.js';

import './CreateDocForm.css';


export default function CreateDocForm({ toggle, editorContent, selectedDoc, setSelectedDoc }) {
    const [name, setName] = useState("");

    // Saves new document and sets it as selectedDoc
    async function saveDoc(e) {
        e.preventDefault();
        
        if (name !== "") {
            let content = "";
            
            if (!selectedDoc.name && editorContent !== "") {
                content = `${editorContent}`;
            }

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
    
    // Form to set name for new document.
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
                    <button type="button" onClick={() => toggle()}>Cancel</button>
                </form>
            </div>
        </div>
    );
}