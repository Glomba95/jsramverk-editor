import React, { useState, useEffect } from 'react';
import docsModel from '../models/docs';


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
    
    // Set editor content to stored content of selected document
    // or none if no stored document is selected
    const fetchDoc = (doc) => {
        if (doc) {
            let element = document.querySelector("trix-editor");
            element.value = "";
            element.editor.insertHTML(doc.content);
            
            setSelectedDoc(doc);  
        } else {
            setSelectedDoc({});
        }
    }
    
    // ─── Dropdown Options ────────────────────────────────
    
    const docsList = docs.map((doc, index) => {
        return <option 
                    value={index}
                    key={doc._id}
                    onClick={() => fetchDoc(doc)}
                >
                    {doc.name}
                </option>
    });
    
    docsList.unshift(
        <option 
            value="-99" 
            key="0" 
            onClick={() => fetchDoc(0)}
        >
            Open document
        </option>
    );
    
    // ────────────────────────────────────────────────────
    
    return(
        <select>
            {docsList}
        </select>
    );
}
