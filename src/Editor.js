import React, { useRef } from 'react';
import 'trix';
import './Editor.css';
import { TrixEditor } from "react-trix";


export default function Editor() {
    const editor = useRef(null);
    
    const handleEditorReady = () => {
        // this is a reference back to the editor if you want to
        // do editing programatically
        console.log("Editor ready");
    }
    
    const textContentToConsole = () => {
        console.log(editor.current.editor.element.textContent);
    }

    return (
        <>
            <h1 className="page-header-title">Editor</h1>
            <TrixEditor
                className="trix-editor"
                ref={editor}
                autoFocus={true}
                placeholder="Trix Editor"
                value="initial content <strong>for the editor</strong>"
                onEditorReady={handleEditorReady}
            />
            <div className="trix-save-button-container">
                <button 
                    className="trix-save-button" 
                    type="button" 
                    onClick={textContentToConsole}
                >Save
                </button>
            </div>
        </>
    );
}