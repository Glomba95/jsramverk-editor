import './App.css';
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

import docsModel from './models/docs.js';

import { Editor, DocButtons, SaveButton, AuthForm } from './components';

var updateSelectedDocOnChange = true;

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedDocId, setSelectedDocId] = useState("");
    const [selectedDoc, setSelectedDoc] = useState({});
    const [showCreateDocForm, setShowCreateDocForm] = useState(false);
    const [showShareDocForm, setShowShareDocForm] = useState(false);
    const [showAuthForm, setShowAuthForm] = useState("none"); // Options are "none", "login", "register"
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!loggedIn) {
            // If not logged in, show auth form
            console.log("Not logged in, showing auth form");
            setShowAuthForm("login");
        }
    }, [loggedIn]);

    async function setLoadedDoc(doc) {
        if (doc) {
            await setSelectedDoc(doc);
            await setSelectedDocId(doc["_id"]);

            if (socket) {
                socket.disconnect();
            }

            const tmpSocket = io(docsModel.baseUrl);
            setSocket(tmpSocket);

            if (tmpSocket && doc["_id"]) {
                console.log("setting up socket");
                tmpSocket.emit("create", `${doc._id}`);

                tmpSocket.on("doc", (data) => {
                    console.log("client recieved: ", data.content);
                    console.log("altereditorcontent, content, false");
                    alterEditorContent(data.content, false);
                });
            }

            alterEditorContent(doc.content, true);

        } else {
            await setSelectedDoc({});
            await setSelectedDocId("");

            alterEditorContent("", false);
        }
    }


    // Används för att fylla editorn med innehåll både vid byte av dokument samt av socketen. 
    // När den körs av socketen skall triggerChange vara false annars true
    function alterEditorContent(content, triggerChange) {
        let element = document.querySelector("trix-editor");

        updateSelectedDocOnChange = triggerChange;
        element.value = "";
        element.editor.setSelectedRange([0, 0]);
        // Följande är med två gånger eftersom handleChange triggas två gånger och skall olika.
        updateSelectedDocOnChange = triggerChange;
        element.editor.insertHTML(content);
    }

    function handleChange(html, text) {
        console.log("handleChange: ", html, "\nupdateSelDocOnChange: ", updateSelectedDocOnChange);

        // Variabeln förhindrar att vi triggar setCurrentDoc när en uppdatering av editorn sker från annat håll än oss själva. 
        if (updateSelectedDocOnChange) {
            const copy = Object.assign({}, selectedDoc);
            copy.content = html;

            setSelectedDoc(copy);

            if (socket) {
                console.log("client sends on update: ", selectedDoc.content);
                socket.emit("doc", copy);
            }
        }

        updateSelectedDocOnChange = true;

    }


    function toggleCreateDocForm() {
        setShowCreateDocForm(!showCreateDocForm);
    };

    function toggleShareDocForm() {
        setShowShareDocForm(!showShareDocForm);
    };


    return (
        <>
            <AuthForm
                showAuthForm={showAuthForm}
                setShowAuthForm={setShowAuthForm}
                setLoggedIn={setLoggedIn}
            />
            <DocButtons
                toggleCreateDocForm={toggleCreateDocForm}
                showCreateDocForm={showCreateDocForm}
                selectedDoc={selectedDoc}
                setSelectedDoc={setSelectedDoc}
                selectedDocId={selectedDocId}
                setSelectedDocId={setSelectedDocId}
                alterEditorContent={alterEditorContent}
                setLoadedDoc={setLoadedDoc}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
                showShareDocForm={showShareDocForm}
                toggleShareDocForm={toggleShareDocForm}
            />
            <Editor
                selectedDoc={selectedDoc}
                handleChange={handleChange}
            />
            <SaveButton
                toggleCreateDocForm={toggleCreateDocForm}
                selectedDoc={selectedDoc}
            />
        </>
    );
}

export default App;