import React, { useState, useEffect } from 'react';
import docsModel from '../../models/docs';


export default function DocsDropDown({ selectedDoc, setSelectedDoc, selectedDocId, setSelectedDocId, alterEditorContent, setLoadedDoc, loggedIn }) {
    const [docs, setDocs] = useState([]);

    // Update dropdown-options when selectedDoc is changed
    useEffect(() => {
        if (loggedIn) {
            (async () => {
                console.log("getting docs");
                const allDocs = await docsModel.getAllDocs();
                console.log("doc: ", allDocs);
                setDocs(allDocs);
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDocId, loggedIn]);


    // ─── Dropdown Options ────────────────────────────────

    const options = docs.map((doc, index) => {
        return <option key={index} value={doc._id}>{doc.name}</option>
    });

    // Add default
    options.unshift(
        <option key={"-99"} value={0}>
            Open document
        </option>
    );

    // Save selected dropdown option in state
    const handleChange = (id) => {
        const doc = docs.find(d => d._id === id)
        if (doc) {
            setLoadedDoc(doc);
        } else {
            setLoadedDoc(0);
        }
    }

    // ────────────────────────────────────────────────────


    return (
        <select value={selectedDoc._id} onChange={e => handleChange(e.target.value)}>
            {loggedIn && options}
        </select>
    );
}