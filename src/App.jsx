import './App.css';
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";

import utils from './models/utils.js';

import { Editor, DocButtons, SaveButton, AuthForm } from './components';

// Används för att förhindra evighetsloopar vid socketuppdatering.
var updateSelectedDocOnChange = true;

function App() {
    // doc och id separerade då doc uppdaterar content vid varje teckenförändring i editorn, medans id 
    const [selectedDocId, setSelectedDocId] = useState(""); // Valt dokument, ändras när användaren byter till ett annat
    const [selectedDoc, setSelectedDoc] = useState({}); // Dokumentobjektet, uppdaterar content kontinuerligt när det ändras i editorn
    const [showCreateDocForm, setShowCreateDocForm] = useState(false);
    const [showShareDocForm, setShowShareDocForm] = useState(false);
    const [showAuthForm, setShowAuthForm] = useState("none"); // Options are "none", "login", "register"
    const [socket, setSocket] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    // If not logged in, show auth form
    useEffect(() => {
        if (!loggedIn) {
            console.log("Not logged in, showing auth form");
            setShowAuthForm("login");
        }
    }, [loggedIn]);

    // Laddar ett valt dokument och kopplar socket mot det.
    // Med 'doc' param sätts det som aktivt dokument och visas i editorn, socket lyssnar efter uppdateringar
    // Utan 'doc' param rensas state och editor
    async function setLoadedDoc(doc) {
        if (doc) {
            await setSelectedDoc(doc);
            await setSelectedDocId(doc["_id"]);

            // Koppla ner ev tidigare socket innan ny skapas
            if (socket) {
                socket.disconnect();
            }

            // Skapa ny socket
            const tmpSocket = io(utils.baseUrl);
            setSocket(tmpSocket);

            // Koppla ny socket mot valt doc
            if (tmpSocket && doc["_id"]) {
                console.log("setting up socket");
                tmpSocket.emit("create", `${doc._id}`);

                // Socket: Hantera inkommande dokumentuppdateringar från servern 
                tmpSocket.on("doc", (data) => {
                    console.log("client recieved: ", data.content);
                    console.log("altereditorcontent, content, false");
                    alterEditorContent(data.content, false);
                });
            }

            // Fyll editorn med valt dokuments content
            alterEditorContent(doc.content, true);

        } else {
            await setSelectedDoc({});
            await setSelectedDocId("");

            alterEditorContent("", false);
        }
    }


    /**
     * Ändrar innehållet som visas i editorn.
     * 
     * @param content - Editorns innehåll (HTML-string)
     * @param triggerChange - styr om editor-ändringen ska trigga socket-uppdateringar 
     * (false när den körs av socketen)
     */
    function alterEditorContent(content, triggerChange) {
        let element = document.querySelector("trix-editor");

        updateSelectedDocOnChange = triggerChange;
        element.value = "";
        element.editor.setSelectedRange([0, 0]);
        // Följande är med två gånger eftersom handleChange triggas två gånger och skall olika.
        updateSelectedDocOnChange = triggerChange;
        element.editor.insertHTML(content);
    }


    // ───── Handle Change ─────────────────────────────────────────────────
    /**
    *?  Editorns callback, anropas vid varje förändring av dess content (tecken för tecken).  
    * 
    *  - Om uppdateringen kommer från den lokala användaren:
    *   - Uppdaterar dokumentobjektet (selectedDoc) med contentinnehåll     
    *   - Skickar uppdaterat content till servern via socket 
    *
    *  @param html - editorns nuvarande innehåll, inkl formatering i html 
    *  @param text - editorns nuvarande innehåll, enbart texten
    */
    // ─────────────────────────────────────────────────────────────────────

    function handleChange(html, text) {
        // console.log("handleChange: ", html, "\nupdateSelDocOnChange: ", updateSelectedDocOnChange);

        // Om ändringen gjordes av den egna användaren, annars ignorera.
        if (updateSelectedDocOnChange) {
            // Skapa en kopia av det aktuella dokumentobjektet med uppdaterat content
            const copy = Object.assign({}, selectedDoc);
            copy.content = html;

            // Ersätt nuvarande valt dokumentobjekt med det uppdaterade 
            setSelectedDoc(copy);

            // Socket: Skicka uppdaterat content till servern  
            if (socket) {
                console.log("client sends on update: ", selectedDoc.content);
                socket.emit("doc", copy);
            }
        }
        // Återställ kontrollvariabeln
        updateSelectedDocOnChange = true;
    }


    // Togglefunktioner för formulär

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