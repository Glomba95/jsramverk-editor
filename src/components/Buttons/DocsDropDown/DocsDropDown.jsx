import React, { useState, useEffect } from 'react';
import docsModel from '../../../models/docs';


export default function DocsDropDown({ selectedDoc, setSelectedDoc, setEditorContent }) {
    const [docs, setDocs] = useState([]);

    // Update dropdown-options data when selectedDoc is changed
    useEffect(() => {
        (async () => {
            const allDocs = await docsModel.getAllDocs();
            setDocs(allDocs);
            
            let element = document.querySelector("trix-editor");
            let content = "";
            
            if (selectedDoc.content) {
                content = selectedDoc.content;
            }
            element.value = "";
            element.editor.insertHTML(content);
            setEditorContent(content);
            
        })();
    }, [selectedDoc]);
    
    // ─── Dropdown Options ────────────────────────────────
    
    const options = docs.map((doc, index) => {
        return <option key={index} value={doc._id}>{doc.name}</option>
    });
    
    options.unshift(
        <option key={"-99"} value={0}>
            Open document
        </option>
    );
    
    // OnChange: Set editor content to stored content of selected document
    // or none if no stored document is selected
    const handleChange = (id) => {
        const doc = docs.find(d => d._id === id)
        if (doc) {
            setSelectedDoc(doc);  
        } else {
            setSelectedDoc({});
        }
    }
    
    
    // ────────────────────────────────────────────────────
    
    return(
        <select value={selectedDoc._id} onChange={e => handleChange(e.target.value)}>
            {options}
        </select>
    );
}
