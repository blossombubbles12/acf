"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-40 w-full bg-slate-50 animate-pulse rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Editor...</div>,
});

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'blockquote'],
        ['clean'],
    ],
};

const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
];

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    return (
        <div className="rich-text-editor-container bg-white rounded-2xl overflow-hidden">
            <style jsx global>{`
                .rich-text-editor-container .ql-toolbar.ql-snow {
                    border: none;
                    border-bottom: 1px solid #f1f5f9;
                    background: #f8fafc;
                    padding: 12px;
                }
                .rich-text-editor-container .ql-container.ql-snow {
                    border: none;
                    font-family: inherit;
                    font-size: 1rem;
                    min-height: 180px;
                }
                .rich-text-editor-container .ql-editor {
                    padding: 20px;
                }
                .rich-text-editor-container .ql-editor.ql-blank::before {
                    color: #94a3b8;
                    font-style: normal;
                    left: 20px;
                }
                .rich-text-editor-container .ql-editor p {
                    margin-bottom: 0.5rem;
                }
            `}</style>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
            />
        </div>
    );
}
