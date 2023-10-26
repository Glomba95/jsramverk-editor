import React from 'react';
import 'trix';
import { TrixEditor } from 'react-trix';

import './Editor.css';

export default function Editor({editorContent, setEditorContent}) {
    return (
        <TrixEditor
            className="trix-content"
            autoFocus={true}
            value={editorContent}
            onChange={(value) => setEditorContent(value)}
        />
    );
}
