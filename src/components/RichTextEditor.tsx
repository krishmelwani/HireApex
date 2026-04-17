import React, { useEffect, useRef } from "react";
import { Bold, List, ListOrdered, AlignLeft, AlignCenter } from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
}

const ToolbarBtn = ({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onMouseDown={(e) => e.preventDefault()}
    onClick={onClick}
    title={title}
    className="w-8 h-8 rounded-md flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors"
  >
    {children}
  </button>
);

export default function RichTextEditor({ value, onChange, placeholder, minHeight = 140 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);

  function exec(cmd: string, arg?: string) {
    document.execCommand(cmd, false, arg);
    if (ref.current) onChange(ref.current.innerHTML);
    ref.current?.focus();
  }

  function handleInput() {
    if (ref.current) onChange(ref.current.innerHTML);
  }

  const isEmpty = !value || value === "<br>" || value.replace(/<[^>]+>/g, "").trim() === "";

  return (
    <div className="border border-border rounded-lg bg-white focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all overflow-hidden">
      <div className="flex items-center gap-0.5 border-b border-gray-100 bg-gray-50/60 px-2 py-1.5">
        <ToolbarBtn onClick={() => exec("bold")} title="Bold (Ctrl+B)"><Bold className="w-4 h-4" /></ToolbarBtn>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <ToolbarBtn onClick={() => exec("insertUnorderedList")} title="Bullet list"><List className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("insertOrderedList")} title="Numbered list"><ListOrdered className="w-4 h-4" /></ToolbarBtn>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        <ToolbarBtn onClick={() => exec("justifyLeft")} title="Align left"><AlignLeft className="w-4 h-4" /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("justifyCenter")} title="Align center"><AlignCenter className="w-4 h-4" /></ToolbarBtn>
      </div>
      <div className="relative">
        {isEmpty && placeholder && (
          <div className="absolute top-3 left-3.5 text-sm text-gray-400 pointer-events-none whitespace-pre-wrap">
            {placeholder}
          </div>
        )}
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleInput}
          className="rte-content w-full px-3.5 py-3 text-sm focus:outline-none leading-relaxed"
          style={{ minHeight }}
        />
      </div>
    </div>
  );
}
