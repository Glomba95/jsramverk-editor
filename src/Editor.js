import React from "react";
import "trix";
// import './Editor.css';
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";


export default function Editor() {
    // const editor = useRef();
    
    const handleEditorReady = () => {
        // this is a reference back to the editor if you want to
        // do editing programatically
        console.log("Editor ready");
        // editor.insertString("editor is ready");
    }
    
    const handleChange = (html, text) => {
        // html is the new html content
        // text is the new text content
        console.log('handle change');
    }

    return (
        <>
            <TrixEditor
                className="trix-editor"
                // ref={editor}
                autoFocus={true}
                placeholder="editor's placeholder"
                value="initial content <strong>for the editor</strong>"
                // uploadURL="https://domain.com/imgupload/receiving/post"
                // uploadData={{ "key1": "value", "key2": "value" }}
                // fileParamName="blob"
                onChange={handleChange}
                onEditorReady={handleEditorReady}
            />
        </>
    );
}