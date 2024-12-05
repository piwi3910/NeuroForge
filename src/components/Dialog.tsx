"use client";

import { useEffect, useRef } from 'react';

interface DialogProps {
  title: string;
  message?: string;
  defaultValue?: string;
  onConfirm: (value: string) => void;
  onCancel: () => void;
}

export function Dialog({ title, message, defaultValue = '', onConfirm, onCancel }: DialogProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      onConfirm(inputRef.current.value);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2d2d2d] rounded-lg shadow-lg w-96">
        <div className="p-4 border-b border-[#404040]">
          <h2 className="text-lg font-medium text-white">{title}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-4 space-y-4">
            {message && <p className="text-sm text-gray-300">{message}</p>}
            <input
              ref={inputRef}
              type="text"
              defaultValue={defaultValue}
              className="w-full bg-[#1e1e1e] text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              spellCheck={false}
            />
          </div>
          <div className="p-4 border-t border-[#404040] flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
