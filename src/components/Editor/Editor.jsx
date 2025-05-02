import React from 'react';
import 'trix';
import { TrixEditor } from 'react-trix';

import './Editor.css';

export default function Editor({ selectedDoc, handleChange }) {
    return (
        <TrixEditor
            className="trix-content"
            autoFocus={true}
            default={selectedDoc.content}
            onChange={handleChange}
        />
    );
}