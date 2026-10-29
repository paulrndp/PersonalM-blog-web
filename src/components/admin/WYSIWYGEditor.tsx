"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  RemoveFormatting,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCcw,
  RotateCw,
  Code2,
  FileCode,
  Pilcrow,
} from "lucide-react";

interface WYSIWYGEditorProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  minHeight?: string;
  required?: boolean;
  label?: string;
}

export default function WYSIWYGEditor({
  name,
  defaultValue = "",
  placeholder = "Write your content here...",
  minHeight = "280px",
  required = false,
  label,
}: WYSIWYGEditorProps) {
  const [html, setHtml] = useState(defaultValue);
  const [isSourceMode, setIsSourceMode] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const editorRef = useRef<HTMLDivElement>(null);

  // Helper to count words and characters
  const updateMetrics = useCallback((content: string) => {
    // Strip HTML tags for metrics
    const text = content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    setCharCount(text.length);
    setWordCount(text ? text.split(/\s+/).length : 0);
  }, []);

  // Initialize editor content on mount
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = defaultValue;
    }
    setHtml(defaultValue);
    updateMetrics(defaultValue);
  }, [defaultValue, updateMetrics]);

  // Handle content changes
  const handleContentChange = () => {
    if (editorRef.current) {
      const currentHtml = editorRef.current.innerHTML;
      setHtml(currentHtml);
      updateMetrics(currentHtml);
    }
  };

  // Execute formatting command
  const format = (command: string, value: string | undefined = undefined) => {
    if (isSourceMode) return;
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      handleContentChange();
    }
  };

  // Insert Link
  const handleInsertLink = () => {
    if (isSourceMode) return;
    const url = prompt("Enter web link URL:", "https://");
    if (url && url !== "https://") {
      format("createLink", url);
    }
  };

  // Insert Image URL
  const handleInsertImage = () => {
    if (isSourceMode) return;
    const url = prompt("Enter image URL (https://...):");
    if (url) {
      format("insertImage", url);
    }
  };

  // Toggle Source Code mode
  const toggleSourceMode = () => {
    if (isSourceMode) {
      // Switching from raw HTML to Visual Editor
      if (editorRef.current) {
        editorRef.current.innerHTML = html;
      }
      setIsSourceMode(false);
    } else {
      // Switching from Visual Editor to raw HTML
      if (editorRef.current) {
        setHtml(editorRef.current.innerHTML);
      }
      setIsSourceMode(true);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold text-stone-700 block">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Hidden input to ensure standard FormData submission in Server Actions */}
      <input type="hidden" name={name} value={html} />

      <div className="border border-stone-300 rounded-xl overflow-hidden bg-white shadow-sm focus-within:border-amber-800 focus-within:ring-2 focus-within:ring-amber-800/20 transition">
        {/* Editor Toolbar */}
        <div className="bg-stone-50/90 border-b border-stone-200 p-1.5 flex flex-wrap items-center gap-1 select-none text-stone-700">
          {/* History */}
          <button
            type="button"
            onClick={() => format("undo")}
            disabled={isSourceMode}
            title="Undo (Ctrl+Z)"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 disabled:hover:bg-transparent transition text-stone-600"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("redo")}
            disabled={isSourceMode}
            title="Redo (Ctrl+Y)"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 disabled:hover:bg-transparent transition text-stone-600"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-stone-300 mx-0.5" />

          {/* Block formatting */}
          <button
            type="button"
            onClick={() => format("formatBlock", "<p>")}
            disabled={isSourceMode}
            title="Paragraph Text"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition text-stone-700"
          >
            <Pilcrow className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("formatBlock", "<h1>")}
            disabled={isSourceMode}
            title="Heading 1"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition font-bold text-xs"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("formatBlock", "<h2>")}
            disabled={isSourceMode}
            title="Heading 2"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition font-bold text-xs"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("formatBlock", "<h3>")}
            disabled={isSourceMode}
            title="Heading 3"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition font-bold text-xs"
          >
            <Heading3 className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-stone-300 mx-0.5" />

          {/* Inline formatting */}
          <button
            type="button"
            onClick={() => format("bold")}
            disabled={isSourceMode}
            title="Bold (Ctrl+B)"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition"
          >
            <Bold className="w-3.5 h-3.5 font-bold" />
          </button>
          <button
            type="button"
            onClick={() => format("italic")}
            disabled={isSourceMode}
            title="Italic (Ctrl+I)"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("underline")}
            disabled={isSourceMode}
            title="Underline (Ctrl+U)"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("strikeThrough")}
            disabled={isSourceMode}
            title="Strikethrough"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-stone-300 mx-0.5" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => format("justifyLeft")}
            disabled={isSourceMode}
            title="Align Left"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("justifyCenter")}
            disabled={isSourceMode}
            title="Align Center"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("justifyRight")}
            disabled={isSourceMode}
            title="Align Right"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-stone-300 mx-0.5" />

          {/* Lists & Quotes */}
          <button
            type="button"
            onClick={() => format("insertUnorderedList")}
            disabled={isSourceMode}
            title="Bullet List"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("insertOrderedList")}
            disabled={isSourceMode}
            title="Numbered List"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("formatBlock", "<blockquote>")}
            disabled={isSourceMode}
            title="Blockquote"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition"
          >
            <Quote className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-4 bg-stone-300 mx-0.5" />

          {/* Media & Links */}
          <button
            type="button"
            onClick={handleInsertLink}
            disabled={isSourceMode}
            title="Insert Link"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition text-amber-800"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleInsertImage}
            disabled={isSourceMode}
            title="Insert Image URL"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition text-stone-600"
          >
            <ImageIcon className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("insertHorizontalRule")}
            disabled={isSourceMode}
            title="Insert Divider"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition text-stone-600"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => format("removeFormat")}
            disabled={isSourceMode}
            title="Clear Formatting"
            className="p-1.5 rounded hover:bg-stone-200 disabled:opacity-30 transition text-stone-500"
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
          </button>

          {/* Source Code Toggle */}
          <div className="ml-auto flex items-center">
            <button
              type="button"
              onClick={toggleSourceMode}
              title={isSourceMode ? "Switch to Visual WYSIWYG" : "Switch to HTML Source Code"}
              className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition ${
                isSourceMode
                  ? "bg-amber-800 text-white"
                  : "bg-stone-200 hover:bg-stone-300 text-stone-700"
              }`}
            >
              {isSourceMode ? (
                <>
                  <FileCode className="w-3 h-3" /> Visual Mode
                </>
              ) : (
                <>
                  <Code2 className="w-3 h-3" /> HTML Code
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="relative">
          {/* Visual Editable Canvas */}
          <div
            ref={editorRef}
            contentEditable={!isSourceMode}
            onInput={handleContentChange}
            onBlur={handleContentChange}
            data-placeholder={placeholder}
            style={{
              minHeight,
              display: isSourceMode ? "none" : "block",
            }}
            className="prose max-w-none p-4 text-stone-800 text-sm font-sans focus:outline-none overflow-y-auto empty:before:content-[attr(data-placeholder)] empty:before:text-stone-400 empty:before:pointer-events-none"
          />

          {/* HTML Source Code Mode */}
          {isSourceMode && (
            <textarea
              value={html}
              onChange={(e) => {
                setHtml(e.target.value);
                updateMetrics(e.target.value);
              }}
              style={{ minHeight }}
              placeholder="Paste or write raw HTML code here..."
              className="w-full p-4 font-mono text-xs text-stone-800 bg-stone-900 text-amber-200 focus:outline-none resize-y"
            />
          )}
        </div>

        {/* Status Bar */}
        <div className="bg-stone-50 border-t border-stone-200 px-3 py-1.5 flex items-center justify-between text-[11px] text-stone-500 select-none">
          <div className="flex items-center gap-3">
            <span>
              Words: <strong className="text-stone-700">{wordCount}</strong>
            </span>
            <span>•</span>
            <span>
              Characters: <strong className="text-stone-700">{charCount}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] bg-stone-200/80 font-medium text-stone-600">
              {isSourceMode ? "HTML View" : "WYSIWYG Rich Text"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
