import { useState } from 'react';

interface TagAreaProps {
  handleAddTagName: (tagName: string) => void;
}

export default function TagArea({ handleAddTagName }: TagAreaProps) {
  const [tagNameInput, setTagNameInput] = useState('');

  function handleSubmit() {
    if (tagNameInput && tagNameInput !== '') {
      handleAddTagName(tagNameInput);
      setTagNameInput('');
    }
  }

  return (
    <div>
      <div className="relative">
        <textarea
          id="add-tags"
          value={tagNameInput}
          onChange={(e) => setTagNameInput(e.target.value)}
          className="block w-full h-6 p-1 pr-12 text-xs text-gray-900 border border-gray-400 rounded bg-white focus:border-blue-500 focus:outline-none"
          placeholder="New tag"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="text-white absolute end-0 bottom-0 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-xs px-2 py-1"
        >
          Add
        </button>
      </div>
    </div>
  );
}
