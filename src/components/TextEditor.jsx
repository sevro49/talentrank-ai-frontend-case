import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';
import './TextEditor.scss';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

const TextEditor = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`quill-container ${isFocused ? 'focused' : ''}`}>
      <ReactQuill
        value={value}
        onChange={onChange}
        theme="snow"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default TextEditor;
