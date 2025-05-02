import './App.css';
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

import docsModel from './models/docs.js';

import { Editor, DocButtons, SaveButton } from './components';


function App() {
    const [selectedDoc, setSelectedDoc] = useState({});
    const [editorContent, setEditorContent] = useState('');
    const [docs, setDocs] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [socket, setSocket] = useState(null);
    
    let saveDataToSelectedDoc = true;
    
    useEffect(() => {
            // FLOW 2: Request connection and save to state
            setSocket(io(docsModel.baseUrl));
            
            //REVIEW Står i jsrguiden att den skall stå här men oklart
            // socket.on("doc", (data) => {
            //     setMyEditorContent(data.content, false);
            // })
            
            // REVIEW Körs när kopplar från?
            return () => {
                if (socket) {
                    socket.disconnect();
                }
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDoc]);
    
    
    // FLOW Join room on selectedDoc-change
    // NOTE Gör detta i docsdropdown? eller här?
    useEffect(() => {
        if(socket && selectedDoc._id) {
            socket.emit("create", `${selectedDoc.name}`);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDoc._id]);
    
    // useEffect(() => {
    //     if (socket) {
    //         socket.on("docEdit", (data) => {
    //             console.log("recieved docEdit: \n" + data);
    //             // setEditorContent(data);
    //         });
    //     }
    // }, [socket]);
    
    
    // TODO här kör emit till servern via socketen när innehållet uppdaterats. 
    // NOTE Kanske editorContent uppdateras hela tiden eller annan state men vid key-up eller liknande körs denna?
    // NOTE om tidigare note: varje knapptryck skall ju skickas direkt så skicka vid onKeyUp istället för onChange? Kan vara problem med om ändrar formattering? Klick på knapp i toolbar också triggar.
    // NOTE även tar emot broadcasts från servern och uppdaterar editorn med.
    // useEffect(() => {
    //     console.log("editorContent: " + editorContent);
    //     socket.emit("docEdit", editorContent);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [editorContent]);
    
    
    // Toggle CreateDocForm
    function toggleForm() {
        setShowForm(!showForm);
    };
    
    function handleChange(html, text) {
        // NOTE variabeln förhindrar att vi triggar setCurrentDoc när en uppdatering av editorn sker från annat håll än oss själva. 
        if (saveDataToSelectedDoc) {
            const copy = Object.assign({}, selectedDoc);

            copy.content = html;

            console.log("copy: ", copy);

            setSelectedDoc(copy);
        }

        saveDataToSelectedDoc = true;
    }
    
    // function setMyEditorContent(content, updateSelectedDoc) {
    //     let element = document.querySelector("trix-editor");

    //     saveDataToSelectedDoc = updateSelectedDoc;
    //     element.value = "";
    //     element.editor.setSelectedRange([0, 0]);
    //     // NOTE är med två gånger eftersom handleChange triggas två gånger och skall olika.
    //     saveDataToSelectedDoc = updateSelectedDoc;
    //     element.editor.insertHTML(content);
    // }
    
    return (
        <>
            <DocButtons 
                toggleForm={toggleForm}
                showForm={showForm}
                selectedDoc={selectedDoc}
                setSelectedDoc={setSelectedDoc}
                editorContent={editorContent}
                docs={docs}
                setDocs={setDocs}
            />
            <Editor 
                selectedDoc={selectedDoc}
                handleChange={handleChange}
            />
            <SaveButton 
                toggleForm={toggleForm}
                selectedDoc={selectedDoc}
                editorContent={editorContent}
            />
        </>
    );
}

export default App;
