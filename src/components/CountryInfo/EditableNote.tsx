import { useState, useEffect } from 'react';

interface EditableNoteProps {
  note: string;
  onSave: (note: string) => void;
  placeholder?: string;
}

export const EditableNote = ({ note, onSave, placeholder = "メモを入力..." }: EditableNoteProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(note);

  useEffect(() => {
    setEditValue(note);
  }, [note]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(note);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <textarea
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md resize-none"
          rows={4}
          placeholder={placeholder}
          autoFocus
        />
        <div className="flex space-x-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            保存
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
          >
            キャンセル
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50 min-h-[80px]"
    >
      {note ? (
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{note}</p>
      ) : (
        <p className="text-sm text-gray-400 italic">{placeholder}</p>
      )}
    </div>
  );
};