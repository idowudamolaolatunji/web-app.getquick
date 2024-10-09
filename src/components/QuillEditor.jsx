import React, { useEffect, useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function QuillEditor() {
    const [value, setValue] = useState('Type..');

    useEffect(function() {
        console.log(value)
    }, [value]);
    
    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
        />
    )
}

export default QuillEditor